
// interface Planets {
//     area: number;
//     name: string;
// }

// class Moon implements Planets{ // IS-A relationship
//     area: number;
//     name: string;
//     private constructor(area: number, name: string) {
//         this.area = area;
//         this.name = name;
//     }
//     static instance: Moon;
//     static getInstance(area: number, name: string) {
//        if(!Moon.instance){
//         Moon.instance = new Moon(area, name);
//        }
//        return Moon.instance;
//     }
// }

// class Earth implements Planets {
//     area: number;
//     name: string;
//     private constructor(area: number, name: string) {
//         this.area = area;
//         this.name = name;
//     }
//     static moon:Moon=Moon.getInstance(100,"Moon"); // HAS-A relationship
//     static instance: Earth;
//     static getInstance(area: number, name: string) {
//        if(!Earth.instance){
//         Earth.instance = new Earth(area, name);
//        }
//        return Earth.instance;
//     }
// }


interface Shape {
    name: string;
    getName():string;
    getArea():number;
}

class Circle implements Shape {
    name: string ;
    private radius:number
    static circleInsatcne:Circle;
    private constructor(name:string,readius:number){
        this.name=name;
        this.radius=readius;
    }

    getCircleObject(name:string,readius:number){
        if(!Circle.circleInsatcne){
            Circle.circleInsatcne=new Circle(name,readius);
        }
        return Circle.circleInsatcne;
    }
    getName(){
        return this.name;
    }

    getArea(){
        return Math.PI*this.radius*this.radius;
    }

}



