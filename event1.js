var arr=[];
arr.push(()=>{
    console.log("a");
})

arr.push(()=>{
    console.log("b");
})

arr.push(()=>{
    console.log("c");
})

arr.forEach((item)=>{
    item();
}
)


function Emitter(){
    this.event={};
}


