import {Rule } from "rools";

export class CustomRule extends Rule {
    badge: string;
    point: number;
    constructor(options) {

        options.then=async (facts)=>{
            console.log('implement your custom logic here');
            console.log(facts);
            this.badge = options.badge;
            this.point = options.point;
            console.log(this.badge);
            console.log(this.point);
        };
        
        super(options);
    }


}