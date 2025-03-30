function divideSubAccounts(accounts, targetChunkSize) {
    let chunks = [];
    let currentChunk = [];
    let currentSize = 0;

    for (const accountObj of accounts) {
        let { account, subAccounts } = accountObj;
        let startIndex = 0;

        while (startIndex < subAccounts.length) {

            //decide end index for chunk size : 
            // 1.if currentSize < than targetChunkSize then push all
            // and need to move start index to end so it's like can process next subAccount
            //2. if currentSize >= targetChunkSize then push targetChunkSize only
            // push chunk then reset/empty currentChunk and currentSize for next process

            //this is checking can we take all subAccounts or not
            let endIndex = Math.min(startIndex + (targetChunkSize - currentSize), subAccounts.length);
            //divide such that it takes ele based on conditions:  {>,<,=}
            let chunkPart = subAccounts.slice(startIndex, endIndex);

            // Add to the current chunk
            currentChunk.push({ account, subAccounts: chunkPart });
            currentSize += chunkPart.length; //incrras current chunkSize as new push

            // If the chunk is full, push it and start a new one
            if (currentSize >= targetChunkSize) {
                chunks.push(currentChunk);
                currentChunk = [];
                currentSize = 0;
            }

            startIndex = endIndex;
        }
    }

    // Push any remaining data
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    return chunks;
}

// Example Usage
let accounts = [
    { account: 1, subAccounts: Array.from({ length: 23 }, (_, i) => i + 1) },
    { account: 2, subAccounts: Array.from({ length: 19 }, (_, i) => i + 26) },
    { account: 3, subAccounts: Array.from({ length: 9 }, (_, i) => i + 41) },
];

let targetChunkSize = 10; // Each chunk should contain at most 10 subAccounts

let result = divideSubAccounts(accounts, targetChunkSize);
console.log(JSON.stringify(result, null, 2));
