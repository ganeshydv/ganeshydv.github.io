
/* Polymorphism: 
polymorphism allows objects to be treated as instances of that common interface
Method overriding is a way to achieve polymorphism by providing specific implementations 
for methods declared in abstract classes or interfaces.

*/

interface Shape {
     name: string;
    getName(): string;
}

class Circle implements Shape {
    name: string;
    private radius: number;
    constructor (name:string,radius: number) {
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

class Rectangle implements Shape {
    name: string;
    private length: number;
    private breadth: number;
    constructor (name:string,length: number,breadth: number) {
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

let circle: Shape = new Circle("Circle",10);
let rectangle: Shape = new Rectangle("Rectangle",10,20);

export {}