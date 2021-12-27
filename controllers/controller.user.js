const userSchema=require('../models/schema.products')

const saveUser=async(user)=>{
    console.log(user)
    const user1= new userSchema(user)
    const saveUser= await user1.save()
    return saveUser
}
const retrieveUserId=async(email)=>{
const user=await userSchema.findOne({id:email})
return user._id
}

module.exports={saveUser,retrieveUserId}