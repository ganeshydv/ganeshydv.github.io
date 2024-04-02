"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
}
class Man {
    constructor(name) {
        this.name = name;
    }
    walk() {
        return new Promise((resolve, reject) => {
            resolve("Man walking");
        });
    }
    talk() {
        return new Promise((resolve, reject) => {
            resolve("Man talking");
        });
    }
}
