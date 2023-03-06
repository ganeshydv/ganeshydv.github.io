const util=require('util');

const EvenetEmitter=require('./6_EventEmmiterInheritance').EvenetEmitter;

let events=new EvenetEmitter();
events.on('greet',()=>{console.log("hello");})

// function accesEventEmitter(type){
//     events.emit(type);
// }

// accesEventEmitter('greet');

function evenInheriter(){

}
util.inherits(evenInheriter,EvenetEmitter);
