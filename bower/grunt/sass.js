const fs = require('node:fs');
const path = require('node:path');
const {dirs,Bootstrap} = require('./dirs');
const utils = require('./utils');
const TreeJs = require("directory-tree");

// { expand: true, cwd: BOOTSTRAP + 'scss', src: ['bootstrap.scss'], dest: BOOTSTRAP + 'dist/css', ext: '.css' },

const item = [dirs.BOOTSTRAP_COMPONENTS,dirs.THEMES];

const defaulds = () => {
    let result = new Array();
    let result2 = new Array();

    [Bootstrap.scss].forEach(t => result.push({
        expand: true,
        dest: t.replace(/scss/g,'dist/css'),
        cwd: t,
        src:[ 'bootstrap.scss' ],
        ext: '.css'
    }) );

    item.forEach(t => result2.push({
        expand: true,
        dest: dirs.srcScss(t).replace(/scss/g,'dist/css'),
        cwd: dirs.srcScss(t),
        src:[ path.parse(t).name + '.scss' ],
        ext: '.css'       
    }));
    return result.concat(result2);
};

const paternExclude = /node_modules|grunt|app|\.DS_Store|\.map|dist|js/;
function sassFile() {
    const result = new Array();
    TreeJs(dirs.BOWER_POSIX,{exclude:paternExclude})?.children.forEach(t => {
        let [name,scssPath] = [path.parse(t.path).name, fs.existsSync(t.path + '/scss') ? t.path + '/scss' : t.path + '/src/scss' ];
        const fullName = fs.existsSync(scssPath + '/' + name + '.scss') ? scssPath + '/' + name + '.scss' : false;
        
        if(fullName){
            result.push({
                expand: true, 
                cwd: scssPath,
                src: [path.parse(fullName).base],
                dest: scssPath.replace(/scss/g,'dist/css'),
                ext: '.css'
            });
        }
    });
    return result;
}

module.exports = {defaulds,sassFile};