const {normalize,schema}=require('normalizr')
const util=require('util')
const normalizeInfo=(data)=>{
    const authorSchema= new schema.Entity("users")
    const commentsSchema = new schema.Entity("comments",{
        commenter:authorSchema
    })
    const chatSchema=new schema.Entity("articles",{
        author:authorSchema,
        comments:[commentsSchema]
    })
    const normalizeChat=normalize(data,chatSchema)
    return normalizeChat
}

function print(objeto){
    console.log(util.inspect(objeto,false,12,true))
}


module.exports={normalizeInfo,print}