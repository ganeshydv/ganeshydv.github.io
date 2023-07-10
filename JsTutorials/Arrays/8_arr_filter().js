
const arr=[1,2,3,4,5,6];

const arr_filter=arr.filter((ele,index,arr_whole)=>{
    // return true //if elements should be copied in new array
    // return false // if element should be removed
    return ele>3;
})

console.log(arr_filter);