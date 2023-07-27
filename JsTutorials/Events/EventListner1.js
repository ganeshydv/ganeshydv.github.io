
function Emitter(){  
    this.events={};  //--->FORMAT: {key1:[fucn1,func2....],key2:[fucn1,func2....],.....}
}

 // main purpose of this function is to add array of events i.e. function or listners in the object 
 //type ==> KEY of Object
 //listner==> Value of object
Emitter.prototype.on=function(type,listner){
    this.events[type]=this.events[type] || [];  // <---- if 'type' is not in 'events' object then add array
    this.events[type].push(listner); 
}

// this emit function will be called when we need and it will run all method present in 'events[type]'
Emitter.prototype.emit=function(type){
    if(this.events[type]){
        this.events[type].forEach(element => {
            element();
        });
    }
 }

 module.exports=Emitter;