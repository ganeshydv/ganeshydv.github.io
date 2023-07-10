const getEntriesInParts = (entries, limit) => {
    const startIndex = 0;
    const result = entries.splice(startIndex, limit);
    if (!result) result = [];
    return result;
};

function f1() {
    const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const limit = 3;

    let remainingEntries = entries;
    let retrievedEntries = [];

    while (remainingEntries.length > 0) {
        const result = getEntriesInParts(remainingEntries, limit);
        retrievedEntries = retrievedEntries.concat(result);
        // remainingEntries = remainingEntries.slice(limit);
    }

    console.log(retrievedEntries);

}
f1();


