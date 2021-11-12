const socket=io()
socket.on("msn_send",(data)=>{
    render(data)

    
})

const render=(data)=>{
    let html = data.map(x=>{
        return `<p>${x.name}: ${x.msn}</p>`
    }).join(" ")
    document.querySelector("#caja").innerHTML=html
}

const addinfo=()=>{
    let dataObj={
        name:document.querySelector("#user").value,
        msn:document.querySelector("#msn").value
    }
    socket.emit("msn_client",dataObj)
    document.querySelector("#msn").value=""
    document.querySelector("#user").disabled=true
    return false
}