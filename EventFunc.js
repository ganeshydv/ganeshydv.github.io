const emitter_=require('./EventListner1');

let em1=new emitter_()
em1.on('greet',()=>{
    console.log("greetings from me.......");
})

console.log(em1.events)
em1.events.greet[0]();
em1.emit('greet')