// /*

// Intro:

//     Filtering requirements have grown. We need to be
//     able to filter any kind of Persons.

// Exercise:

//     Fix typing for the filterPersons so that it can filter users
//     and return User[] when personType='user' and return Admin[]
//     when personType='admin'. Also filterPersons should accept
//     partial User/Admin type according to the personType.
//     `criteria` argument should behave according to the
//     `personType` argument value. `type` field is not allowed in
//     the `criteria` field.

// Higher difficulty bonus exercise:

//     Implement a function `getObjectKeys()` which returns more
//     convenient result for any argument given, so that you don't
//     need to cast it.

//     let criteriaKeys = Object.keys(criteria) as (keyof User)[];
//     -->
//     let criteriaKeys = getObjectKeys(criteria);

// */

// interface User {
//     type: 'user';
//     name: string;
//     age: number;
//     occupation: string;
// }

// interface Admin {
//     type: 'admin';
//     name: string;
//     age: number;
//     role: string;
// }

// export type Person = User | Admin;

// export const persons: Person[] = [
//     { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
//     { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
//     { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
//     { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
//     { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
//     { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
// ];

// export function logPerson(person: Person) {
//     console.log(
//         ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
//     );
// }

// const getObjectKeys = <T>(x: T) => {return Object.keys(x) as (keyof T)[]};
// const getObjectKeys2 = <T>(x: T) => {return <(keyof T)[]>Object.keys(x)}; // same as above

// // type assertion is done in above function to make sure that the return type is correct


// // following is the function that is to be overloaded to accept different types of arguments and return different types of results based on the type of argument
// // this is done by defining the function multiple times with different signatures
// // this is necessary because the type of the argument is not known at compile time and hence the return type cannot be determined
// // hence we need to define the function multiple times with different signatures

// export function filterPersons(persons: Person[], personType: User['type'], criteria: Partial<Omit<User, 'type'>>): User[];
// export function filterPersons(persons: Person[], personType: Admin['type'], criteria: Partial<Omit<Admin, 'type'>>): Admin[];
// export function filterPersons(persons: Person[], personType: Person['type'], criteria: Partial<Person>): Person[] {
//     return persons
//         .filter((person) => person.type === personType)
//         .filter((person) => {
//             let criteriaKeys = getObjectKeys(criteria);
//             return criteriaKeys.every((fieldName) => {
//                 return person[fieldName] === criteria[fieldName];
//             });
//         });
// }

// export const usersOfAge23 = <User[]> filterPersons(persons, <User["type"]>'user', <Partial<Person>> { age: 23 } );
// export const adminsOfAge23 = filterPersons(persons, 'admin' as Admin['type'], { age: 23 } as Partial<Person>) as Admin[];

// console.log('Users of age 23:');
// usersOfAge23.forEach(logPerson);

// console.log();

// console.log('Admins of age 23:');
// adminsOfAge23.forEach(logPerson);

// // In case you are stuck:
// // https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads

