
module.exports=class Container {
    
    constructor(arr){
        this.arr=arr
    }
    get(){
        
        return this.arr;
    }
    getById(id){
        let product=this.arr.filter((x)=>{
            return x.id==id
        })
        return product[0]
    }
    setProduct(product){
        product.id=this.calculateID()
        this.arr.push(product)
        return product;
    }
    updateProduct(id,name,price){
        this.arr.forEach((element,index,array)=>{
            
            if(element.id==id){
                element.name=name
                element.price=price
                console.log(element.id)
                return element
            }
            return element
        })
        return this.arr
    }
    deleteById(id){
        let newArray=this.arr.filter(x=>x.id!=id)
        this.arr=newArray
        return newArray;
    }
    calculateID(){
        let newId=this.arr.length+1
        return newId
    }
}