

let arr=[1,2,3,4];

// slice can be used for copy 

let result=arr.slice();
arr.push(5);
console.log(arr,result);

// to select 3 array use slice

let result2=arr.slice(1,4)
console.log(result2);