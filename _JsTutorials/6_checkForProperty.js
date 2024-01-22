const personKey="add"
let person={
    name:"tony",
    age:"30",
    [personKey]:""
}
console.log(person);

console.log('name' in person);
console.log(person.hasOwnProperty("name"));