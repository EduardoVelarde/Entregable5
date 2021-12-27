const Message=require('../models/shema.message.js')

const saveComment=async(comment,UserId)=>{
    const msg= new Message({
        message:comment,
        author:UserId
    })
    const newMesssage=await msg.save()
    return newMesssage
}

const getAllMessage=async()=>Message.find().populate('author').exec()

module.exports= {saveComment,getAllMessage}