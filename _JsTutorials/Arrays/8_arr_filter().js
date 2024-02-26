
const arr=[1,2,3,4,5,6];

const arr_filter=arr.filter((ele,index,arr_whole)=>{
    // return true //if elements should be copied in new array
    // return false // if element should be removed
    if(ele>3)return ele; // [ 4, 5, 6 ]
    // return ele>3;    // [ 4, 5, 6 ]
})

console.log(arr_filter);