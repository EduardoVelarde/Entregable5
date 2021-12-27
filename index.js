const express= require('express')
const app = express()
require('./src/db.js')
const {saveUser,retrieveUserId}=require('./controllers/controller.user.js')
const {saveComment,getAllMessage}=require('./controllers/controller.message.js')
const {createNewChat,getAllChats,findChatById}=require('./controllers/controller.chat')
const faker=require('faker')
const {normalizeInfo,print}=require('./src/utils/normalize_data.js')
const routerMessage=require('./routers/comments.js')
const handlebears=require('express-handlebars')
let PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//middlewares
app.use(express.static(__dirname+"/public"))
app.use("/api",routerMessage)
app.set("views","./views")
app.set("view engine","hbs")
app.engine("hbs", 
    handlebears({
        extname:"hbs",
        layoutsDir:__dirname+"/views/layouts",
        defaultLayout:"index",
        partialsDir:__dirname+"/views/partials"
    })
)
//server
const http=require('http')
const server=http.createServer(app)

//The routes below are use to control message comming from the server
 // sockt IO
const {Server}=require('socket.io');
const io=new Server(server)
io.on("connection",async(socket)=>{
    const chat=await createNewChat("Chat")
    socket.on("msn_client",async(data)=>{
        
        const {message,author}=data
        const getUserId=await retrieveUserId(author)
        const newComment=await saveComment(message,getUserId)
        chat.comments.push(newComment)
        const newChat=await chat.save()
        const chatInfo=await findChatById(newChat._id)
        const cleanup=JSON.stringify(chatInfo)
        const cleanup2=JSON.parse(cleanup)
        const optimatizedObject=normalizeInfo(cleanup2)
        print(optimatizedObject)
        io.sockets.emit("msn_send",{optimatizedObject,chatInfo})
        //socket.emit("msn_send",msn)
    })
})
// socket IO configutation
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
