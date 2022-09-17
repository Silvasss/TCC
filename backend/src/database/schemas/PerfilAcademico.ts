import mongoose from "mongoose";


const UserPerfilAcademico = new mongoose.Schema({
    idPerfil: {
        type: String,
        required: true      
    },
    instituicaoEnsino: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true,
    },
    anoInicio: {
        type: String,
        required: true
    },
    semestreEntrada: {
        type: Number,
        required: true
    },
    anoSaida: {
        type: String,
        required: false
    },
    semestreSaida: {
        type: Number,
        required: true
    },
})


export default mongoose.model("PerfilAcademico", UserPerfilAcademico)
