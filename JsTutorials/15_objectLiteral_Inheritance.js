

const course={
    title:"Naruto",
    rating:"10"
}

Object.setPrototypeOf(course,{
    ...Object.getPrototypeOf(course),
    printRating:function(){
        console.log(`Book : ${this.title} Rating : ${this.rating}/10`);
    }
})

course.printRating();