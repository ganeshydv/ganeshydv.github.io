"use strict";
// interface Planets {
//     area: number;
//     name: string;
// }
class Circle {
    constructor(name, readius) {
        this.name = name;
        this.radius = readius;
    }
    getCircleObject(name, readius) {
        if (!Circle.circleInsatcne) {
            Circle.circleInsatcne = new Circle(name, readius);
        }
        return Circle.circleInsatcne;
    }
    getName() {
        return this.name;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
