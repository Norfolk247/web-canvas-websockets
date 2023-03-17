require('dotenv').config()
const express = require('express')
const app = express()
const wsserver = require('express-ws')(app)
const awss = wsserver.getWss()
const PORT = process.env.PORT

app.ws('/',(ws,req) =>{
    ws.on('message',(msg)=>{
        msg = JSON.parse(msg)
        on_draw(ws,msg)
    })
})

app.listen(PORT,()=>console.log(`server:${PORT}`))

const on_draw = (ws,msg) => {
    ws.id = msg.id
    awss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}
