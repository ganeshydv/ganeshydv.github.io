module.exports = async function F1() {
    console.log('F1 start');
    // console.log(await sleep(1000));
    // console.log('F1 done');

    return sleep();

    // there is no need to use await here beacause it will give the same result
    // as above return statement

    // return await sleep();
}


// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve("from sleep"), ms));
// }

function sleep() {
    console.log('F1.JS');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('F1.JS timeout');
            resolve("from F1.JS");
        }, 1000);
    });
}