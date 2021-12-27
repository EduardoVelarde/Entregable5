const {saveUser,retrieveUserId}=require('../controllers/controller.user.js')
const {saveComment,getAllMessage}=require('../controllers/controller.message.js')
const faker=require('faker')
const {Router}=require('express')
const router=new Router()
//Mock data created with faker
const fillProducts=()=>{
    let listProduct=[]
    for(let i=0;i<=5;i++){
        listProduct.push({
            name:faker.commerce.product(),
            price:faker.commerce.price(),
            photo:faker.image.food()
        })
    }
    return listProduct;
}
//router used to provide inf
router.get("/products-test",(req,res)=>{
    let randomList=fillProducts()
    res.render("main",{data:randomList})
})

router.get('/message',async(req,res)=>{
    const post=await getAllMessage()
    res.json({msg:'All working properly',data:post})
})

router.post("/saveUser",async(req,res)=>{
    const user=await saveUser(req.body)
    res.redirect("/api/products-test")
})

router.post("/postComments",async(req,res)=>{
    let {message,email}=req.body
    const userId=await retrieveUserId(email)
    console.log(userId)
    const newMessage=await saveComment(message,userId)
    res.json({status:"SUCCESS",data:newMessage})
})

module.exports=router