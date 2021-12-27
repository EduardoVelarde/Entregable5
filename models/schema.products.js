const mongoose=require('mongoose')

const {Schema,model}=require('mongoose')

const authorSchema= new Schema({
    id:String,
    nombre:String,
    apellido:String,
    edad:Number,
    alias:String,
    avatar:String
})

module.exports=model("author",authorSchema)