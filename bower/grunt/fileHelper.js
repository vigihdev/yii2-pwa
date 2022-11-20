// @ts-nocheck
const TreeJs = require("directory-tree");
const path = require('path');
const { dirs } = require("./dirs");
const BOWER = "";
const paternExclude = /node_modules|grunt|app|\.DS_Store|\.map/;
const isFile = (pathStr) => !!path.extname(pathStr);
const isFileName = (pathStr, extension) => !!path.extname(pathStr) && path.extname(pathStr) === extension;
const isScss = (pathStr) => isFileName(pathStr, '.scss');
const isJs = (pathStr) => isFileName(pathStr, '.js');
const isCss = (pathStr) => isFileName(pathStr, '.css');

function scanFile() {
    const scss = new Array();
    const js = new Array();
    const css = new Array();

    TreeJs(dirs.BOWER_POSIX, { exclude: paternExclude })?.children.forEach(t => {
        t.children?.forEach(t1 => {
            isScss(t1.path) ? scss.push(t1.path) : true;
            isJs(t1.path) ? js.push(t1.path) : true;
            isCss(t1.path) ? css.push(t1.path) : true;
            t1.children?.forEach(t2 => {
                isScss(t2.path) ? scss.push(t2.path) : true;
                isJs(t2.path) ? js.push(t2.path) : true;
                isCss(t2.path) ? css.push(t2.path) : true;
                t2.children?.forEach(t3 => {
                    isScss(t3.path) ? scss.push(t3.path) : true;
                    isJs(t3.path) ? js.push(t3.path) : true;
                    isCss(t3.path) ? css.push(t3.path) : true;
                    t3.children?.forEach(t4 => {
                        isScss(t4.path) ? scss.push(t4.path) : true;
                        isJs(t4.path) ? js.push(t4.path) : true;
                        isCss(t4.path) ? css.push(t4.path) : true;
                        t4.children?.forEach(t5 => {
                            isScss(t5.path) ? scss.push(t5.path) : true;
                            isJs(t5.path) ? js.push(t5.path) : true;
                            isCss(t5.path) ? css.push(t5.path) : true;
                        });
                    });
                });
            });
        });
    });

    return {
        js:js,scss:scss,css:css
    }
}

module.exports = { scanFile };