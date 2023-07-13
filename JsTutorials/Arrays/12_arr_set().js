// no order
// no duplicates
// iterable

// const ids=[1,2,1,3,2,1,4,5,6,4]
const ids=new Set([1,2,3]);
console.log(ids.has(1));  // true
ids.add(2);


// ids.entries()  : return type : IterableIterator<> so can be used in for loop
for(const ele of ids.entries()){
    console.log(ele);
}

for(const ele of ids.values()){
    console.log(ele);
}