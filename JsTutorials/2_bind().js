
function getDetails(msg,pName,pAge){
    console.log(msg)
    console.log("name: "+pName+" age: "+pAge);
}


// getDetails.bind(this,"Your Details are :")

function showDetails(callbackFunc,name,age){
    // callbackFunc.bind(this,"Your Details are :")
    // callbackFunc(name,age);
    const boundFunc = callbackFunc.bind(this, "Your Details are :");  //bind method return new function 
  boundFunc(name, age);
  boundFunc("stark",34);
}

showDetails(getDetails,"tony",24);