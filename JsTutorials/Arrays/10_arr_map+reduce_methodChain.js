
const originalArray = [{price: 10.99}, {price: 5.99}, {price: 29.99}];

const sum=originalArray.map((ele)=>{return ele.price})
.reduce((preVal,curVal,curIndex,arr)=>{return preVal+curVal},0)  ;// 0: 2nd param in reduce for startindex

// const sum = originalArray.map(obj => obj.price)
//     .reduce((sumVal, curVal) => sumVal + curVal, 0);

console.log(sum);