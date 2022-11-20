const fs = require('node:fs');
const path = require('node:path');

const readdir = (directory) => fs.readdirSync(directory);
const test = (str,regex) => new RegExp(regex,'gi').test(str); 

const distDir = (dir) => dir + '/dist';
const distDirJs = (dir) => dir + '/dist/js';
const distDirCss = (dir) => dir + '/dist/css';

const getDist = (dir) => fs.existsSync(distDir(dir)) ? distDir(dir) : dir + '/src/dist';

module.exports = {readdir,test,distDir,distDirCss,distDirJs,getDist};