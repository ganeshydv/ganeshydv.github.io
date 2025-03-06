console.log("Start...");

async function asyncFunction() {
    console.log("in async function");
    //some async operation
    console.log('Hi -- 1');
    
    setTimeout(() => { // 2nd. this will send to macrotask queue
        console.log('Hi from setTimeout');
    }, 0);
    console.log('Hi -- 2')
    return "async function done"; // 1st. this will send to microtask queue
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
async function done
Hi from setTimeout
*/