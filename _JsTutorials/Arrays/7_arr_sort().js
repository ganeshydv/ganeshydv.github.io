
const arr=[4,10,3,2]

// VIMP : sort method converts each elements into STRING and then it performs sorting so in sort() "10" <"3" it comapres first element only
// console.log(arr.sort());  // OP: [ 10, 2, 3, 4 ]

console.log(arr);

const sortedArr=arr.sort((a,b)=>{
    if(a>b){ return 1;}
    else if (a===b){return 0;}
    else return -1;
})

console.log(sortedArr);