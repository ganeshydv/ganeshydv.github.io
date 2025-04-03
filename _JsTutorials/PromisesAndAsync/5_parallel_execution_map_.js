
// ✅ Solution: Use Promise.all() for Parallel Execution

const arr = [1, 2, 3, 4, 5];

async function promisifyAll(arr) {
    await Promise.all(
        arr.map(element => 
            new Promise((resolve) => {
                setTimeout(() => {
                    console.log(element);
                    resolve("done");
                }, 1000);
            })
        )
    );
    console.log("All done");
}

promisifyAll(arr);
