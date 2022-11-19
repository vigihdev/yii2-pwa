
const fs = require('node:fs');
const path = require('node:path');
const {dirs,Bootstrap,Tree} = require('./dirs');
const utils = require('./utils');

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

module.exports = {concatCss,jsSrcToDist,jsDistToApp};
