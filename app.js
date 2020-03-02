const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const indexRoutes = require("./routes/index")

const cadastroRoutes = require("./routes/cadastro")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors())


app.use("/", indexRoutes)

app.use("/cadastro", cadastroRoutes)




module.exports = app