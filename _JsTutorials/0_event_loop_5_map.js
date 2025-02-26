
function someFunction2(params) {
    return params.map((param) => {
        // console.log(param);
        return param;
    });
}
// console.log("Start...");
// console.log(someFunction2([1, 2, 3]));
// console.log("End");

// The above code will print:
// Start...
// [ 1, 2, 3 ]
// End

const fetchData = async (id) => {
    return `Data for ${id}`;
  };
  
  const ids = [1, 2, 3];
  
  const results = ids.map(async (id) => await fetchData(id));
  
  console.log( Promise.all(results)); // ❌ [Promise, Promise, Promise]
  
  
console.log("End");



