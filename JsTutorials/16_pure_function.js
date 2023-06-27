

//PURE Function : for same i/p ==>always same o/p ==>AND AND never changes or affects other var, obj means never change it's values

function add (a,b){
    console.log(a+b);
}

// IMPURE function : changes some var,obj etc outside of scope 


let x=10;
function add(b){
   
    console.log(x)
    x=b; // here it modifies x 
}