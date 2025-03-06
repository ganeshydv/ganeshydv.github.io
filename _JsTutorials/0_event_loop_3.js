
console.log("Start...");

async function asyncFunction() {
    console.log("in async function");
    //some async operation
    let x= await new Promise((resolve) => {
        console.log('Hi -- 1')
        resolve(10);//this will send 10 to microtask queue : execution context/stack is changed
        console.log('Hi -- 2'); //this will be executed after the resolve is executed
    });
    console.log("x:", x);
    
    return "async function done";
}
console.log("calling async function");
asyncFunction().then((x) => {
    console.log(x);
});

console.log("end");

/*
Start...
calling async function
in async function
Hi -- 1
Hi -- 2
end
x: 10
async function done
*/
