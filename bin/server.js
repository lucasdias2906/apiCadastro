const express = require("express")
//const debug = require("debug")("nodestr:server")
const app = require("../app")


const server = express()

server.use(app)
server.listen(3000,function(){
    console.log("iniciei o servidor")
})