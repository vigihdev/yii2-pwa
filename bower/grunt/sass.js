const fs = require('node:fs');
const path = require('node:path');
const {dirs,Bootstrap} = require('./dirs');
const utils = require('./utils');

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

module.exports = {defaulds};