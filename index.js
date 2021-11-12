const express= require('express')
const app = express()
const handlebears=require('express-handlebars')
const Container= require('./src/Container.js')
let PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
let arr=[
    {
        name:"tijeras",
        price:"25",
        url:"https://www.officedepot.com.mx/medias/75879.jpg-1200ftw?context=bWFzdGVyfHJvb3R8OTQ0MTh8aW1hZ2UvanBlZ3xoNGMvaGY5Lzk3MzU3NTMyMDM3NDIuanBnfGNhNmUzMGE1YmIyNTJlODVjZjFjMzM2Mzk0MGRlZTI0MmRiODBmNDA0OTdiZDYzNmQyMGQ3NDRiODk0MzQxNmM"
    },
    {
        name:"lapices",
        price:"25",
        url:"https://www.officedepot.com.mx/medias/45607.jpg-1200ftw?context=bWFzdGVyfHJvb3R8MjIzOTIwfGltYWdlL2pwZWd8aDZjL2gwMC85NzM0OTg1Mjg1NjYyLmpwZ3w0Y2M5MDk3MWIyYmQ2ZTFiNTAzNzJkZDY2Y2RmYTFlMzA2MDBmNzBiZmI4YTQxZjY4NjA5MjAyM2I1MWY3ZDBm"
    }
]
//Array users
let msn= []
//middlewares
app.use(express.static(__dirname+"/public"))
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
 // sockt IO
const {Server}=require('socket.io');
const io=new Server(server)
io.on("connection",(socket)=>{
    socket.on("msn_client",(data)=>{
        msn.push(data)
        io.sockets.emit("msn_send",msn)
        //socket.emit("msn_send",msn)
    })
})
// socket IO configutation
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})

app.get("/products",(req,res)=>{
    res.render("main",{data:arr})
})
app.post("/products",(req,res)=>{
    console.log(req.body)
    arr.push(req.body)
    res.redirect("/products")
})