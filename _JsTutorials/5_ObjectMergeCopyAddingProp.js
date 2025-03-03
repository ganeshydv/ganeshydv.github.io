
const personKey="add"
let person={
    name:"person",
    age:"30",
    [personKey]:""
}
console.log(person);

let Teacher={...person}
Teacher.name="teacher";
Teacher.age=22;
console.log("teacher",Teacher);
console.log('person',person);
Teacher.dob="1990";
let mergedObj=Object.assign(Teacher)
mergedObj.name="merged obj";
// mergedObj=Object.assign(Teacher,person)  // -->  Not works because 
console.log('merged obj',mergedObj);
console.log('person',person);

console.log('name' in person);
console.log(person.hasOwnProperty("name"));