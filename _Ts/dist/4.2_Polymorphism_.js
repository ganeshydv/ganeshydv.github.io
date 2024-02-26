"use strict";
/* Polymorphism:
polymorphism allows objects to be treated as instances of that common interface
Method overriding is a way to achieve polymorphism by providing specific implementations
for methods declared in abstract classes or interfaces.

*/
Object.defineProperty(exports, "__esModule", { value: true });
class Circle {
    constructor(name, radius) {
        this.name = name;
        this.radius = radius;
    }
    getName() {
        return this.name;
    }
    getRadius() {
        return this.radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle {
    constructor(name, length, breadth) {
        this.name = name;
        this.length = length;
        this.breadth = breadth;
    }
    getName() {
        return this.name;
    }
    getLength() {
        return this.length;
    }
    getBreadth() {
        return this.breadth;
    }
    getArea() {
        return this.length * this.breadth;
    }
}
let circle = new Circle("Circle", 10);
let rectangle = new Rectangle("Rectangle", 10, 20);
