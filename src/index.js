// ESTRUTURA CENTRAL DO SERVER


const express = require ( 'express' )
const bodyParser = require ( 'body-parser' )


const app = express()
app.engine
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
require('./app/controllers/index')(app)

app.listen(5081,()=>{
    console.log(`Servidor online em http://localhost/5081/`)
})