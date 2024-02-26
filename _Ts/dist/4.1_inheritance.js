"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Circle extends Shape {
    constructor(name, radius) {
        super(name);
        this.radius = radius;
    }
    getRadius() {
        return this.radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class accessData {
    constructor(circleRadius) {
        this.circleRadius = circleRadius;
        this.circle = new Circle("Circle", this.circleRadius);
    }
    getCircleDetails(radius) {
        return {
            name: this.circle.getName(),
            radius: this.circle.getRadius(),
            area: this.circle.getArea()
        };
    }
}
