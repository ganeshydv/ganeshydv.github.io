/*
🚨 Problem: forEach() Does Not Await async Functions

- forEach() does not respect await because it does not return a Promise.
- It fires off all iterations at once, causing them to execute in parallel.
*/
const arr = [1, 2, 3];

arr.forEach(async (num) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(num);
});

console.log("Done");
// Output (order is NOT as expected):
// Done
// 1 (after 1s)
// 2 (after 1s)
// 3 (after 1s)
