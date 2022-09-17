import mongoose from "mongoose";


const userPerfilProfissional = new mongoose.Schema({
    idPerfil: {
        type: String,
        required: true      
    },
    empresa: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true,
    },
    anoInicio: {
        type: String,
        required: true
    },
    anoSaida: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    }
})

export default mongoose.model("PerfilProfissional", userPerfilProfissional)
