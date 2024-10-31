use std::io;

// std: package
// io: module
// :: - path separator operator
// new: function in the io module  
//(new is a function that returns a new instance of a string)

fn main() {
    println!("Hello, world!");

    //creating a new instance of a string
    // in this case, it is an empty string
    // in java it would be String input = new String();
    // String is a type and new is a function that returns a new instance of a string

    let mut input = String::new();
    let mut x : String = String:: new() ;


    // io::stdin().read_line(input) // it passes by value so it will not work

    // io::stdin().read(&input) // by default input is immutable so it will not work

    // &mut input : pass by reference
    io::stdin().read_line(&mut input).expect( "Failed to read line");

    io::stdin().read_line(&mut x).expect( "Failed to read line");

    println!("{}" , input);

    operators_op(x, input);
}

fn operators_op(x:String,y:String) {
    let x:i16 = x.trim().parse().unwrap();
    let y:i16 = y.trim().parse().unwrap();

    let p=10i8;
    let q= 10_i8;
    let r =28 as i32;

    let sum = (x as i16) + (y as i16);
    let diff = x - y;
    let prod = x * y;
    let div = x / y;
    let rem = x % y;

    println!("Sum: {}", sum);
    println!("Diff: {}", diff);
    println!("Prod: {}", prod);
    println!("Div: {}", div);
    println!("Rem: {}", rem);
}