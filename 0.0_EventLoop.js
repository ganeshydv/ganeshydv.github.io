console.log('1'); console.log('2');
function sum(a, b) { // setTimeout  
    console.log('5');
    return function (a, b) {
        // console.log(a+b);       
        return a + b;
    };
}// console.log(sum1(8,1));
(async function abc() { console.log(await sum1(8, 1)) })();

async function sum1(a, b) {
    console.log('3'); console.log(await sum(a, b)(a, b));
    var a1 = await sum(a, b)(a, b); //--> q       
    console.log(a1); console.log('4');  //-->q    
    return a1;
}
console.log('8')       //-->