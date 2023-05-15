

let p={
    name:"tony",
    getThis:function(){
        console.log(this);
    }
}

let {getThis}=p;
getThis=getThis.bind(localStorage);
getThis();