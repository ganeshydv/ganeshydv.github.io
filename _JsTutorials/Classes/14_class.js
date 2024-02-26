
// class Product{
//     constructor(title,price){
//         this.title=title;
//         this.price=price;
//     }
// }

// class ProductList{
//     ProductsArr =[ new Product("a pillow",20),new Product("silent voice",30)];
// }

// class ProductItem{
//     constructor(product){
//         this.product=product;
//     }
//     render(){

//     }
// }
//--------------------------- class ----------------


class Person1{
    name="g";                                       // this will be added afetr reunning constructor and it willl be like > this.name="g"
    constructor()
    {
      this.greet=function(){                              //---------> this will be created for every instance
        console.log("greet from Person class object");
      }
    }
    greet2=function(){                                    //---------> this will be created for every instance
      console.log("in this kind of function defination { this } always refers to the { object who called this method } use bind() or call() if want avoid undefind error");
    }
    greet3=()=>{                                            //---------> this will be created for every instance 
      console("in arrow func this will always refer to object in which it is defined ")
    }
  
    greet4(){                                         //---------> this will added to Prototype so it will be created once and shared among evry instance
      console.log("greet from Person class object");
    }
  }  
  
  class Student extends Person1{
    constructor(){
      super();
    }
  }
