
console.log("Start...");

async function asyncFunction() {
    console.log("in async function");
    return "async function done";
}
console.log("calling async function");
asyncFunction().then(console.log);
console.log("end");

/*
Start...
calling async function
in async function
end
async function done
*/