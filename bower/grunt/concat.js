// @ts-nocheck
const fs = require('node:fs');
const path = require('node:path');
const {dirs,Bootstrap,Tree, items} = require('./dirs');
const utils = require('./utils');
const TreeJs = require("directory-tree");

const optionJs = { extensions: /\.js/ };
const optionCss = { extensions: /\.css/ };

function jsSrcToDist(){
    const result = new Object();
    [
        dirs.JQUERY,
        dirs.YII2,
        dirs.PLUGIN_JS,
        dirs.BOOTSTRAP_COMPONENTS,
        dirs.THEMES
    ].forEach(t => {
        const name = path.parse(t).name;
        const src = Tree(dirs.srcJs(t),optionJs);
        const dest = dirs.distJs(t) + '/' + name + '.js';
        result[dest] = src;
    });
    return result;
}

function jsDistToApp(){
    const result = new Array();
    const data = new Object();
    const getName = (t) => dirs.distJs(t) + '/' + path.parse(t).name + '.js';

    [ dirs.PLUGIN_JS ].forEach(t => result.push( ...[getName(t),Bootstrap.fileJs ]) );
    [ dirs.YII2,dirs.THEMES ].forEach(t => result.push( getName(t)) );

    data[dirs.APP + '/dist/js/app.js'] = result;
    return data;
}

function concatCss() {
    let result = new Array();
    [Bootstrap.distCss].forEach(t => result.push(t + '/bootstrap.css'));

    [
        dirs.THEMES,
        dirs.BOOTSTRAP_COMPONENTS
    ].forEach( t => result.push(dirs.distCss(t) + '/*.css') );
    return result;
}

const paternExclude = /node_modules|grunt|app|themes|\.DS_Store|\.map|scss|js/;
const isFile = (pathStr) => !!path.extname(pathStr);
const isFileExtname = (pathStr, extension) => !!path.extname(pathStr) && path.extname(pathStr) === extension;

function cssDistFiles() {
    const result = new Array();
    const parent = [
        dirs.BOWER_POSIX + '/bootstrap/dist/css/bootstrap.css', 
        dirs.BOWER_POSIX + '/themes/src/dist/css/themes.css',
        dirs.BOWER_POSIX + '/themes-test/src/dist/css/themes-test.css',
        dirs.BOWER_POSIX + '/themes-dark-tint/src/dist/css/themes-dark-tint.css'
    ];
    const _dist = '/dist/css';

    TreeJs(dirs.BOWER_POSIX,{exclude:paternExclude})?.children.forEach(t => {
        let [name,scssPath] = [path.parse(t.path).name, fs.existsSync(t.path + _dist) ? t.path + _dist : t.path + '/src' + _dist ];
        const fullName = fs.existsSync(scssPath + '/' + name + '.css') ? scssPath + '/' + name + '.css' : false;

        if( path.parse(t.path).base !== 'bootstrap' && fullName){
            result.push(fullName);
        }
    });
    return parent.concat(result);
}

function jsDistFilesConcatToApp() {
    const exclude = /node_modules|grunt|app|jquery|\.DS_Store|\.map|scss/;
    const result = new Array();
    const data = new Object();
    const parent = [
        dirs.BOWER_POSIX + '/plugin-js/src/dist/js/plugin-js.js',
        dirs.BOWER_POSIX + '/bootstrap/dist/js/bootstrap.js',
        dirs.BOWER_POSIX + '/yii2/src/dist/js/yii2.js',
        dirs.BOWER_POSIX + '/bootstrap-components/src/dist/js/bootstrap-components.js',
    ];
    const _dist = '/src/dist/js';

    TreeJs(dirs.BOWER_POSIX,{exclude:exclude})?.children.forEach(t => {
        let [name,jsPath] = [path.parse(t.path).name, t.path + _dist ];
        if(fs.existsSync(jsPath)){
            let names = jsPath + '/' + name + '.js';
            if(fs.existsSync(names)){
                result.push(names);
            }
        }
    });

    let dataUnique = [...new Set(parent.concat(result))];
    data[dirs.BOWER_POSIX + '/app/dist/js/app.js'] = dataUnique;
    jsFilesConcatToDist()
    return data;
}

function jsFilesConcatToDist() {
    const exclude = /node_modules|grunt|app|\.DS_Store|\.map|scss|css|dist/;
    const result = new Array();
    const data = new Object();
    const parent = new Array();
    const _js = '/js';

    TreeJs(dirs.BOWER_POSIX,{exclude:exclude})?.children.forEach(t => {
        let [name,jsPath] = [path.parse(t.path).name, fs.existsSync(t.path + _js) ? t.path + _js : t.path + '/src' + _js ];

        if(fs.existsSync(jsPath)){
            t.children?.forEach(t1 => {
                t1.children?.forEach(t2 => {
                    t2.children?.forEach(t3 => {
                        isFileExtname(t3.path,'.js') ? parent.push(t3.path) : true;
                        t3.children?.forEach(t4 => {
                            isFileExtname(t4.path,'.js') ? result.push(t4.path) : true;
                            t4.children?.forEach(t5 => {
                            });
                        });
                    });
                });
            });

            const filterPath = (tpath) => path.parse(tpath).dir === t.path + '/src/js';
            const filterPaths = (tpath) => new RegExp(t.path,'gi').test(tpath);
            data[t.path + '/src/dist/js/' + name + '.js' ] = parent.concat(result).filter(filterPaths);
        }
    });
    const newData = new Object();
    for(const [key,value] of Object.entries(data)){
        if(value.length > 0){
            newData[key] = value;
        }
    }
    return newData;
}

module.exports = {
    concatCss,
    jsSrcToDist,
    jsDistToApp,
    cssDistFiles,
    jsFilesConcatToDist,
    jsDistFilesConcatToApp
};
