
abstract class Human{
    abstract talk():Promise<string>;
    abstract walk():Promise<string>;
}

class Man implements Human{

    constructor(public name: string){}
    walk():Promise<string>{
        return new Promise<string>((resolve,reject)=>{
            resolve("Man walking");
        })
    }

    talk(): Promise<string> {
        return new Promise<string>((resolve,reject)=>{
            resolve("Man talking");
        })
    }
}

// interface 

interface SetConstructor {
    new <T = any>(values?: readonly T[] | null): Set<T>;
    readonly prototype: Set<any>;
}


export {}