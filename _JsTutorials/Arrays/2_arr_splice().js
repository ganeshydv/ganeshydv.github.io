
let arr =[1,2,3,4,5];

// to add element: 
arr.splice(0,0,'ok');  // arg1: start index .. arg2 : number of elements to be deleted .. arg3 : element to be added
console.log(arr);  //[ 'ok', 1, 2, 3, 4, 5 ]


// to delete element
 
let ele=arr.splice(0,2,"ok","go") // will delete 2 element from start a
console.log(arr);  //[ 'ok', 'go', 2, 3, 4, 5 ]

arr.splice(-1,1) //deletes last one
arr.splice(-2,1)  // deletes from second to last

arr.splice(1);  // deletes all element from index 1
// SPLICE divides Original array and returns new array
// of first half of original array and It actually changes Original array as
// well
const getEntriesInParts = (entries, limit) => {
    const startIndex = 0;
    const result = entries.splice(startIndex, limit);
    if (!result) result = [];
    return result;
};

function copyInNewAndRemoveFromOld() {
    const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const limit = 3;

    let remainingEntries = entries;
    let retrievedEntries = [];

    while (remainingEntries.length > 0) {
        const result = getEntriesInParts(remainingEntries, limit);
        retrievedEntries = retrievedEntries.concat(result);
        console.log(result)
        // console.log(remainingEntries);
        // remainingEntries = remainingEntries.slice(limit);
    }

    console.log(retrievedEntries);
    console.log(remainingEntries);
    console.log(entries);

}
copyInNewAndRemoveFromOld();


