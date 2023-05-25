
class Product{
    constructor(title,price){
        this.title=title;
        this.price=price;
    }
}

class ProductList{
    Products =[ new Product("a pillow",20),new Product("silent voice",30)];
}

class ProductItem{
    constructor(product){
        this.product=product;
    }
    render(){
        
    }
}
