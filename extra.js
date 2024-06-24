const { healthcare } = require("googleapis/build/src/apis/healthcare");




  let getEntriesInParts = (entries, limit) => {
    const startIndex = 0;
    const result = entries.splice(startIndex, limit);
    if (!result) result = [];
    return result;
  };

  function HELLO () {
    let usersChunk=[];
    const users = [
      { name: "user1", age: 21 },
      { name: "user2", age: 22 },
      { name: "user3", age: 23 },
      { name: "user4", age: 24 },
      { name: "user5", age: 25 },
      { name: "user6", age: 26 },
      { name: "user7", age: 27 },
      { name: "user8", age: 28 },
      { name: "user9", age: 29 },
      { name: "user10", age: 30 },
      { name: "user11", age: 31 },
      { name: "user12", age: 32 },
      { name: "user13", age: 33 },
      { name: "user14", age: 34 },
      { name: "user15", age: 35 },
      { name: "user16", age: 36 },
      { name: "user17", age: 37 },
      { name: "user18", age: 38 },
      { name: "user19", age: 39 },
      { name: "user20", age: 40 },
    ];
    while (
        (usersChunk = getEntriesInParts(
          users,
          4
        )).length > 0
      ) {
        console.log(usersChunk);
    
      }
  }

  HELLO();