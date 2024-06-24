"use strict";
/*
Intro:

    We are starting a small community of users. For performance
    reasons, we have decided to store all users right in the code.
    This way we can provide our developers with more
    user-interaction opportunities. With user-related data, at least.
    All the GDPR-related issues will be solved some other day.
    This would be the basis for our future experiments during
    these exercises.

Exercise:

    Given the data, define the interface "User" and use it accordingly.

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPerson = exports.users = void 0;
exports.users = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];
function logPerson(user) {
    console.log(` - ${user.name}, ${user.age}`);
}
exports.logPerson = logPerson;
console.log('Users:');
exports.users.forEach(logPerson);
// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/objects.html
