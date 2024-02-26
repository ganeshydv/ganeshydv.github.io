fn main() {
    println!("Hello, world!");
    let x=5;
    println!("x is : {}",x);

    {
        println!("x is : {}",x+1); // x from the outer scope is used
        let x=0; // new declaration of x shadows the previous declaration
        println!("x is : {}",x);
        let x=x+1;   // x from the inner scope is used
        println!("x is : {}",x);
    }

    let x=x+1; // x from the current scope is used
    println!("x is : {}",x);

    let x="hello";  // new declaration of x shadows the previous declaration
    println!("x is : {}",x);

    const_ex();

}

fn const_ex(){
    // constant declaration 
    const MAX_POINTS: u32 = 100_000;
    println!("MAX_POINTS is : {}",MAX_POINTS);
    scalar_data_types();
}

fn scalar_data_types(){
    // scalar data types
    let x=5; // integer
    let y=5.0; // floating point
    let z=true; // boolean
    let a='a'; // character
    let b="hello"; // string
    let _p:i32=5; // integer with explicit type annotation
    let p:u32=5; // unsigned integer with explicit type annotation
    let q:f64=5.0; // floating point with explicit type annotation
    let r:bool=true; // boolean with explicit type annotation
    // let r:bool=0; // boolean with explicit type annotation
    println!("x is : {}",x);
    println!("y is : {}",y);
    println!("z is : {}",z);
    println!("a is : {}",a);
    println!("b is : {}",b);
    println!("p is : {}",p);
    println!("q is : {}",q);
    println!("r is : {}",r);

}
