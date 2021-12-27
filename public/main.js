const socket=io()
socket.on("msn_send",(data)=>{
    console.log(data)
    render(data)

    
})

const render=(data)=>{
    let html = data.map(x=>{
        return `<p>${x.name}: ${x.message}</p>`
    }).join(" ")
    document.querySelector("#caja").innerHTML=html
}

const addinfo=()=>{
    let dataObj={
        message:document.querySelector("#msn").value,
        author:document.querySelector("#user").value
    }
    socket.emit("msn_client",dataObj)
    document.querySelector("#msn").value=""
    document.querySelector("#user").disabled=true
    return false
}