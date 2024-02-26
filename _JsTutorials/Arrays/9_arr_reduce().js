
// used to reduce array into single number/string i.e. single value

const arr=[1,2,3,4,5];

const sum=arr.reduce((preVal,curVal,curIndex,arr)=>{
    return preVal+curVal;
},0);

console.log(sum);

// reduce() mainly used to convert one array into single element by performing some operation on same elements.