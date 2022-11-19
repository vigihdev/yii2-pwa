
const path = require('node:path');
const {dirs,Bootstrap,Tree,assets} = require('./dirs');
const utils = require('./utils');

const css = (src,dest) => {
    return {
        expand: true,
        cwd:utils.getDist(src) + '/css',
        src:['**'], 
        dest:dest + '/dist/css'
    };  
};

const js = (src,dest) => {
    return {
        expand: true,
        cwd:utils.getDist(src) + '/js',
        src:['**'], 
        dest:dest + '/dist/js'
    };  
};

function appJquery(){
    const result = [
        js(dirs.JQUERY,assets.jQuery),
        js(dirs.APP,assets.app),
        css(dirs.APP,assets.app),
    ];
    return result;
}
module.exports = {appJquery};
