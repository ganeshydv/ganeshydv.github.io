
class Shape {
    private name: string;
    constructor (name: string) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Circle extends Shape {
    private radius: number;
    constructor (name:string,radius: number) {
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

    private circleRadius:number;
    private circle!:Circle;

    constructor(circleRadius:number) {
        this.circleRadius = circleRadius;
        this.circle = new Circle("Circle",this.circleRadius);
    }

    getCircleDetails(radius:number){
        return {
            name: this.circle.getName(),
            radius: this.circle.getRadius(),
            area: this.circle.getArea()
        }
    }
}

export {};