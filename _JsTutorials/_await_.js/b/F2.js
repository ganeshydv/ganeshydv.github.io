const F1 = require('../a/F1.js');

async function F2() {
    console.log('F2 start');
    console.log( F1());
    // following line will work for F1.JS to return a promise
    // console.log(await F1());
    console.log('F2 done');

}
F2();