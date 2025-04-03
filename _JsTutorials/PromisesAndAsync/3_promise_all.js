
const arr = [1, 2, 3, 4, 5];
async function promisifyAll(arr) {
    // return new Promise(async(resolve, reject) => {
    //     //  arr.map(async (ele) => {
    //     //     setTimeout(() => {
    //     //         console.log(ele);
    //     //         resolve(ele);
    //     //     }, 1000)
    //     // })
    //     for (let i = 0; i < arr.length; i++) {
    //         await new Promise((resolve) => {
    //             setTimeout(() => {
    //                 console.log(arr[i]);
    //                 // resolve(arr[i]);
    //                 resolve("done");
    //             }, 1000)
    //         })
    //     }
    //     resolve("done");
    // })
    // for (let i = 0; i < arr.length; i++) {
    //     await new Promise((resolve) => {
    //         setTimeout(() => {
    //             console.log(arr[i]);
    //             // resolve(arr[i]);
    //             resolve("done");
    //         }, 1000)
    //     })
    // }
    // arr.map((ele) => {
    //     setTimeout(() => {
    //         console.log(ele);
    //     }, 1000)
    // })

    arr.forEach( async element => {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(element);
                // resolve(arr[i]);
                resolve("done");
            }, 1000)
        })
    });
}

promisifyAll(arr)