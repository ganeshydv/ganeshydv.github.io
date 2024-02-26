
 const p1={name:"tony"};
 const p2={name:"stark"};

 const persons=new  Map([[p1,[{location:"at ydv"}]]]);
 for(let ele of persons.entries()){
    console.log(ele);
 }

persons.set(p2,{k1:"2nd person"})

console.log(persons.get(p2));


 for(let [key,val] of persons.entries()){
    console.log(key,val);
 }

 for(let key of persons.keys()){
    console.log(key);
 }

 console.log(persons.size());