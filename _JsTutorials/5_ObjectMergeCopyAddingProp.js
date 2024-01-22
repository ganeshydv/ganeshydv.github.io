
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

let mergedObj=Object.assign(Teacher)
mergedObj.name="a";
// mergedObj=Object.assign(Teacher,person)  // -->  Not works because 
console.log(mergedObj);

console.log('name' in person);
console.log(person.hasOwnProperty("name"));