
// create event object

function eventListner(){
    this.obj={};
}

eventListner.prototype.on=(type,callBackFunc)=>{
    this.obj[type]=this.obj[type]||[];
    this.obje[type].push(callBackFunc);
}

eventListner.prototype.emit=function(type){
    if(this.obj[type]){
        this.obj.forEach(func => {
            func();
        });
    }
}