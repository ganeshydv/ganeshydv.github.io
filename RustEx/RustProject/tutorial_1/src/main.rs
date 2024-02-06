fn main() {
    println!("Hello, world!");
    let x=5;
    println!("x is: {}",x);

    // x=6; // This will cause an error because x is immutable

    let mut y=5;
    println!("y is: {}",y);
    y=6; // This is fine because y is mutable

    let z=5;
    println!("z is: {}",z);
    let z=z+1; // This is fine because z is immutable
    println!("z is: {}",z);
}
