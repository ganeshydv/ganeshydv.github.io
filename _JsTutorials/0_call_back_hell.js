function a1(callback) {
    console.log("a1");
    callback(1,1.1);
}

function a2(callback) {
    console.log("a2");
    callback(2);
    // callback();
}
function a3(callback) {
    console.log("a3");
    callback(3);
}

function start(){
    console.log("start");
    a1((x,y)=>{
        console.log(x,y)
        a2((x)=>{
            console.log(x)
            a3((x)=>{
                console.log(x)
                console.log("end")  
            })
        })
    })
    // a1(a2(a3));
    
}

start();