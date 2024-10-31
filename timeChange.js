// let moment= require('moment-timezone')

// var report_date=moment("2023-10-16T18:29:32.000Z").tz('America/New_York').format("hh:mm A");

// console.log(report_date);


// let fs = require('fs');

// const data = [
//     { name: 'John', age: 30, cities: ['New York', 'Chicago', 'San Francisco'] },
//     { name: 'Alice', age: 25, cities: ['Los Angeles'] }
// ];

// // Convert data to CSV format
// const csvRows = data.map(person => {
//     const citiesString = `"${person.cities.join(', ')}"`;
//     return `${person.name},${person.age},${citiesString}`;
// });

// // Join rows into a CSV string
// const csvString = csvRows.join('\n');

// console.log(csvString);

// fs.writeFileSync('predefined_comments.csv', csvString);


// let el={
// "predefinedComments": "WINDSHIELD-CRACKS,WINDSHIELD-SCRATCHED",
// "photoUrl": "dgfh",
// "hasDamage": true,
// }
// if (!el.photoUrl && 
//     el.hasDamage === true && 
//     !el.predefinedComments.endsWith("OTHER")){
//     console.log("error");
// }

console.log(Math.floor(1000 + Math.random() * 9000));
