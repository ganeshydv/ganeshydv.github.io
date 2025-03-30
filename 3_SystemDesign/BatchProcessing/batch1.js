function divideSubAccounts(accounts, targetChunkSize) {
    let chunks = [];
    let currentChunk = [];
    let currentChunkSize = 0;

    for (const accountObj of accounts) {
        let { account, subAccounts } = accountObj;
        let startIndex = 0;
        while(startIndex<subAccounts.length){ 
            //split subAccounts
            let endIndex;// this index is variable as it depends on the size of the subAccounts - it may be less than targetChunkSize or === or >  targetChunkSize
            if(subAccounts.length-startIndex>=targetChunkSize){
                endIndex = startIndex + targetChunkSize-currentChunkSize;
            }else{
                endIndex = subAccounts.length;
            }
            currentChunk=subAccounts.slice(startIndex,targetChunkSize);
            currentChunkSize=currentChunk.length;
            
            if(currentChunkSize>=targetChunkSize){
                chunks.push(currentChunk);
                currentChunk=[];
                currentChunkSize=0;
            }
            startIndex=endIndex;
        }

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
