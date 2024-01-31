"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let walk;
walk = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("I am walking");
    }, 3000);
    //   resolve("I am walking");
});
walk.then((value) => {
    console.log("1st op: " + value);
});
//-------------------------------
let talk;
talk = new Promise((resolve, reject) => {
    resolve(123);
});
talk = new Promise((resolve, reject) => {
    resolve("I am talking");
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        //   let result = await walk;
        let result = Promise.all([walk, walk, walk]);
        //   console.log(result);
        result.then((value) => {
            console.log(typeof value);
            console.log("2nd op: " + value);
        });
        //    let result2 = Promise.bind([walk, walk,walk]);
    });
}
run();
