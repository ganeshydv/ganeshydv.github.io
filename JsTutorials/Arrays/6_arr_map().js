const arr=[1,2,3,4];

const arr_copy=arr.map((ele)=>ele) // it creates new copy of array with new address locations
console.log(arr_copy)

const squere_arr=arr.map((ele)=>{
    return ele*ele;
})
console.log(squere_arr);