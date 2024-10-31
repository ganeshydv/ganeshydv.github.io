fn main() {
    println!("Hello, world!");
    array_ex();
}

fn array_ex(){

    let a=[1,2,3,4,5];
    let b:[i32;5]=[1,2,3,4,5]; // array with explicit type annotation
    let c=[3;5]; // array with all elements initialized to 3
    let d=[1,2,3,4,5,6,7,8,9,10];
    let e=&d[1..4]; // slice : from index 1 to 4 (excluding 4)
    let f=&d[1..9]; // slice : from index 1 to 9 (excluding 9)
    let g=&d[1..]; // slice : from index 1 to end (including end)
    let h=&d[..9]; // slice : from index 0 to 9 (excluding 9)
    let i=&d[..]; //  slice : from index 0 to end (including end)
    let j=&d; // slice : from index 0 to end (including end)
    let k=&d[1..=9]; // slice : from index 1 to 9 (including 9)

    println!("a is : {:?}",&a[1..]);
    println!("b is : {:?}",b);
    println!("c is : {:?}",c);
    println!("d is : {:?}",d);
    println!("e is : {:?}",e);
    println!("f is : {:?}",f);
    println!("g is : {:?}",g);
    println!("h is : {:?}",h);
    println!("i is : {:?}",i);
    println!("j is : {:?}",j);
    println!("k is : {:?}",k);

    
}