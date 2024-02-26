

function hello(a,b) {  // this functions 
  return new Promise((resolve, reject) => {
    console.log("Hello from hello() function. This will be executed as synchronous.");
    let sum=a+b;
      resolve('Hello.. sum :' + sum);
  });
}

async function call(){
    console.log("Calling hello() function.");
    setTimeout(() => {
        console.log("After 2 seconds");
    }, 2000);
    hello(1,2).then((data) => {
        console.log(data);
    });
    console.log("Called hello() function.");
}
call();