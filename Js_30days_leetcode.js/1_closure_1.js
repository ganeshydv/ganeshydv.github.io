
function dataManipulation(data){
    let counter=0;
    count =()=>{
        return counter++;
    };
    return {data, count};
//     return {data:data, count:(()=>{
//         return counter++;
//     })()}
}

const d1=dataManipulation(20);
const d2=dataManipulation(40);

console.log(d1.data,d1.count());
console.log(d1.data,d1.count());
// console.log(d1.data,d1.counter);

console.log(d2.data,d2.count());
console.log(d2.data,d2.count());