
// ✅ Solution: Use for...of for Sequential Execution

const arr = [1, 2, 3, 4, 5];

async function promisifyAll(arr) {
    for (let element of arr) {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(element);
                resolve("done");
            }, 1000);
        });
    }
    console.log("All done");
}

promisifyAll(arr);
