import mongoose from 'mongoose'


const InstituicaoSchema = new mongoose.Schema(
  {
    label: {
      type: String
    },
    value: {
      type: String
    },
    instituicaoLatitude: {
      type: String
    },
    instituicaoLongitude: {
      type: String
    },
    cursos: {
      type: Array
    }
    
  },
  { timestamps: true }
)


export default mongoose.model('Instituicao', InstituicaoSchema)