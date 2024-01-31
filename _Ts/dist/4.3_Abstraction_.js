"use strict";
/* Abstraction is a process of hiding the implementation details and showing only
functionality to the user.
Abstraction lets you focus on what the object does instead of how it does it. */
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
/*abstraction provides a common interface,
and polymorphism allows objects to be treated as instances of that common interface.
Method overriding is a way to achieve polymorphism
by providing specific implementations for methods declared in abstract classes or interfaces.
*/
class Animal {
    move() {
        console.log('roaming the earch...');
    }
}
class Dog extends Animal {
    makeSound() {
        // console.log("Bark Bark");
        return new Promise((resolve, reject) => {
            // setTimeout(()=>{
            // resolve(123); // error as the return type of the method is string
            resolve("Bark Bark ........");
            // },5000)
        });
    }
    move() {
        console.log('dog running the earch...');
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let d1 = new Dog();
        // following will pause the execution of the program until the promise is resolved
        // console.log(await d1.makeSound()); 
        // for non-blocking execution of the program we can use then() method
        d1.makeSound().then((value) => {
            console.log(value);
        });
        d1.move();
    });
}
run();
