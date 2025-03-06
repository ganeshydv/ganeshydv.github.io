

// every function in javascript is closure

//lexical environment vs global environmnet 

// lexical env: local scope of function
// lexical scope : Inner function retains access to outer function's variables.

function createCounter() {
    let count = 0; // Private variable

    return function () {
        count++;
        console.log(`Count: ${count}`);
    };
}

const counter = createCounter();
counter(); // Count: 1
counter(); // Count: 2
counter(); // Count: 3

