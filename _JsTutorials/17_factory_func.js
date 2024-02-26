
// Factory Function: function which generates another function

// when to use: you have to call a function multiple times with some same value and some differnent values then just make  a factory fucntion for same vale while that 
// factory function return another function which will value which is variable


function calTax(amount,tax){
    return amount*tax;
} 

let gst=calTax(200,10);
let vat=calTax(200,5);

//---------------------------- Factory Function Example -------------------------

function getTaxCal(tax){
    return function(amount){
        return amount*tax/100;
    }
}

let calGstTax=getTaxCal(10);
console.log("Gst on 200 :"+calGstTax(200));
console.log("Gst on 500 :"+calGstTax(500));



