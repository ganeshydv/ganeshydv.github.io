
/* Abstraction is a process of hiding the implementation details and showing only 
functionality to the user.
Abstraction lets you focus on what the object does instead of how it does it. */


/*abstraction provides a common interface, 
and polymorphism allows objects to be treated as instances of that common interface. 
Method overriding is a way to achieve polymorphism 
by providing specific implementations for methods declared in abstract classes or interfaces.
*/
abstract class Animal {

    abstract makeSound(): Promise<string | string[]>; // Abstract method to be implemented by derived classes

    move(): void {
        console.log('roaming the earch...');
    }
}

class Dog extends Animal {  // polymorphism: as the Dog class is implementing the abstract method makeSound()
    makeSound() {
        // console.log("Bark Bark");
        return new  Promise<string>((resolve,reject) =>{
            // setTimeout(()=>{
                // resolve(123); // error as the return type of the method is string
                resolve("Bark Bark ........");
            // },5000)
        })
    }
    move(): void { // Overriding the base class method
        console.log('dog running the earch...');
    }
}

async function run(){
    let d1:Animal =new Dog();

    // following will pause the execution of the program until the promise is resolved
    // console.log(await d1.makeSound()); 

    // for non-blocking execution of the program we can use then() method
    d1.makeSound().then((value) => {
        console.log(value);
    })
    d1.move();
}

run();
export {}