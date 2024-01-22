const fs = require('fs');


// //-------------------------------------------------------
// // read files directly using fs.readFile()
// // this takes call back but if file it too large use promise 
// // how
// const util = require('util');
// const readFile = util.promisify(fs.readFile); // to make readfile return promise

// async function getJsonData() {
//   try {
//     const jsonData = await readFile('./data.json', 'utf8');
//     return JSON.parse(jsonData);
//   } catch (err) {
//     throw err;
//   }
// }

// //-------------------------------------------------------------
// // if file is not large

// const jsonData = require("file.json");
// // or

// fs.readFile('file.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error:', err);
//     return;
//   }
//   console.log('File contents:', data);
// });
// //------------------------------------------------------
// // to convert string in JS Object

// const jsObject = JSON.parse("{}");

// //----------------------------------------
// // to join path

const path = require('path');

// const completePath = path.join("", "");

// // 
// path.resolve();

// //------------------------------

console.log(path.resolve('utils/a.json'));// WRONG path
console.log(path.resolve(__dirname,'utils/a.json')); // CORRECT path
console.log(path.resolve(__dirname,'utils','a.json')); // CORRECT path