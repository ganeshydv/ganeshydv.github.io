
const personKey="add"
let person={
    name:"tony",
    age:"30",
    [personKey]:""
}
console.log(person);

let Teacher={...person}
Teacher.name="stark";
Teacher.age=22;
console.log(Teacher);