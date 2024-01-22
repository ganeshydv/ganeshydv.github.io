

let p={
    name:"tony",
    getThis:function(){
        console.log(this);
    }
}

let {getThis}=p;
getThis=getThis.bind(localStorage); // bind will create a new object and returns and if use call instead then it will be saving storage as it will not create new object
getThis();