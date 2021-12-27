const Chat=require('../models/schema.chat')
const { v4: uuidv4 } = require('uuid');

const createNewChat=async(type)=>{
    const chat= new Chat({tipo:type})
    const newchat=await chat.save()
    return newchat
}

const getAllChats=async()=>{
   return await Chat.find().populate("comments").exec();
}

const findChatById=async(id)=>await Chat.findById(id).select('-_id -__v')
    .populate({
    path: 'comments', 
    model: 'message',
    select: '-_id -__v',
    populate: {
      path: 'author',
      model: 'author'
    }
  }).exec()

module.exports= {createNewChat,getAllChats,findChatById}