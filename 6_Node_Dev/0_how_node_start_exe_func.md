## What Happens when run cmd `node app.js`?

1. before Node start executing file it encapsulates it in IIEF
```js
//app.js
function example(){
    console.log("example");
}
example();
```
this becomses:
```js
(function(exports, require, module, __filename, __dirname) {
  // Your actual code in app.js
function example(){
    console.log("example");
}
example();

})(module.exports, require, module, __filename, __dirname);
```
### In Node.js, every module is wrapped inside a function before execution. This wrapper function provides five default parameters:
```js
(function(exports, require, module, __filename, __dirname) {
  // Your module code here
});
```
### Explanation of the Parameters:
- `exports` – A shortcut for module.exports. It helps in exporting functions or objects.
- `require` – The function to import other modules.
- `module` – An object representing the current module (has a  property exports).
- `__filename` – The absolute path of the file being executed.
- `__dirname` – The directory path of the current module.