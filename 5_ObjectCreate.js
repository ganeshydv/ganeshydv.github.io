let person={
    name:"",
    lastName:"",
    greet:function(){
        return this.name +" - "+ this.lastName;
    }
}

let tony=Object.create(person);
tony.name="tony";
tony.lastName="stark";
console.log(tony.greet())
let jack=Object.create(person);
jack.name="jack";
jack.lastName="sparrow"
console.log(jack.greet())