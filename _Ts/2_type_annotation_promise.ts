
let walk: Promise<string> | null;

walk = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("I am walking");
    },3000)
//   resolve("I am walking");
});
walk.then((value) => {
  console.log("1st op: "+value);
});
//-------------------------------

let talk: Promise<number | string> | null;
talk = new Promise((resolve, reject) => {
  resolve(123);
});

talk = new Promise((resolve, reject) => {
    resolve("I am talking");
    }
);

async function run() {
//   let result = await walk;
    let result = Promise.all([walk, walk,walk]);
//   console.log(result);
   result.then((value) => {
    console.log(typeof value);
    
       console.log("2nd op: "+value);
   })

//    let result2 = Promise.bind([walk, walk,walk]);
}

run();
export {}; 