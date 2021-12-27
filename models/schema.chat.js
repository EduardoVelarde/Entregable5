const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const {Schema,model}=require('mongoose')

const chatSchema= new Schema({
    id:{ type: String, default: uuidv4()},
    tipo:String, 
    comments:[
        {
            type:Schema.Types.ObjectId,ref:"message"
        }
    ]
})


module.exports=model("chat",chatSchema)