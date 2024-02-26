const arr=[1,2,3,4];

const arr_copy=arr.map((ele)=>ele) // it creates new copy of array with new address locations
console.log(arr_copy)

const squere_arr=arr.map((ele)=>{
    return ele*ele;
})
console.log(squere_arr);

// map() mainly used to extarct values from Object :

const originalArray = [{price: 10.99}, {price: 5.99}, {price: 29.99}];
const transformedArray = originalArray.map(obj => obj.price); // produces [10.99, 5.99, 29.99]