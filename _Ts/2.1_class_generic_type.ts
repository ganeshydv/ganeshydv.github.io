
class customClass<T,P>{
    constructor(public name: T,public age: P){}
}

let c1 = new customClass<string,number>("a",30);