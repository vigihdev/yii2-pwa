const fs = require('node:fs');
const path = require('node:path');
const tree = require("directory-tree");
const { test } = require('./utils');

// DOCUMENT
const DIRECTORY_SEPARATOR = '/';
const BASEPATH = "/Users/thrubus/Sites/dev/pwa/";
const BOWER = BASEPATH + "bower/";
const NODE = BOWER + "node_modules/";
const VENDOR = BASEPATH + "vendor/";
const BOWER_ASSET = VENDOR + "bower-asset/";

const _BOOTSTRAP = BOWER + 'bootstrap';
const Bootstrap = {
    dist: _BOOTSTRAP + '/dist',
    js: _BOOTSTRAP + '/js',
    scss: _BOOTSTRAP + '/scss',
    distCss: _BOOTSTRAP + '/dist/css',
    distJs: _BOOTSTRAP + '/dist/js',
    fileJs: _BOOTSTRAP + '/dist/js/bootstrap.js',
    fileCss: _BOOTSTRAP + '/dist/css/bootstrap.css',
};

const dirs = {
    BOWER_POSIX: '../pwa/bower',
    APP: BOWER + 'app',
    BOOTSTRAP_COMPONENTS: BOWER + 'bootstrap-components',
    JQUERY: BOWER + 'jquery',
    YII2: BOWER + 'yii2',
    THEMES: BOWER + 'themes',
    PLUGIN_JS: BOWER + 'plugin-js',

    distJs: (name) => name + '/src/dist/js',
    distCss: (name) => name + '/src/dist/css',
    srcJs: (name) => name + '/src/js',
    srcScss: (name) => name + '/src/scss',

};

const items = {
    scss: [
        Bootstrap.scss,
        dirs.srcScss(dirs.BOOTSTRAP_COMPONENTS),
        dirs.srcScss(dirs.THEMES),
    ],
    js: [
        dirs.srcJs(dirs.BOOTSTRAP_COMPONENTS),
        dirs.srcJs(dirs.THEMES),
        dirs.srcJs(dirs.YII2),
    ]
};

const assets = {
    jQuery:BOWER_ASSET + 'jquery',
    app:BOWER_ASSET + 'app',
}

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const Tree = (dir, option) => {
    const result = new Array();
    const result1 = new Array();
    tree(dir, option).children?.forEach(t => {
        if (t.children?.length > 0) {
            t.children?.forEach(t2 => result1.push(t2.path))
        }
        if (t.children === undefined) {
            result.push(t.path);
        }
    });
    return result.concat(result1);
};

module.exports = { dirs, Bootstrap, items, Tree, assets };