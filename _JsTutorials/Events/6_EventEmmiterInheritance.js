let EvenetEmitter=function(){
    this.Events={};
}

EvenetEmitter.prototype.on=function(type,callbackFunc){
    this.Events[type]=this.Events[type]||[];
    this.Events[type].push(callbackFunc);
}
EvenetEmitter.prototype.emit=function(type){
    if(this.Events[type]){
        this.Events[type].forEach(element => {
            element();
        });
    }
}

module.exports.EvenetEmitter=EvenetEmitter;