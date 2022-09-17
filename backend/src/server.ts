import express from "express"
import mongoose from "mongoose"
import routes from "./routes"
import cors from 'cors'


// Inicia o express
const app = express()

// Conecta ao Mongo no docker
// Both connect and createConnection take a mongodb:// URI, or the parameters host, database, port, options.
mongoose.connect("mongodb://localhost/tcc")

app.use(cors())

app.use(express.json())
app.use(routes)

// Qual porta vai ser utilizada
app.listen(4000, () => {
    console.log("Serve Up!")
})