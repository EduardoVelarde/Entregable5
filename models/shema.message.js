const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const {Schema,model}=require('mongoose')

const messageSchema= new Schema({
    id:{ type: String, default: uuidv4()},
    message:String,
    author:{type:Schema.Types.ObjectId,ref:"author"}
})

module.exports=model("message",messageSchema)