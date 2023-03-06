import mongoose from 'mongoose'


const GradSchema = new mongoose.Schema(
  {
    nomeEgresso: {
      type: String,
    },
    instituicao: {
      type: String,
      required: [true, 'Por favor, forneça instituicao'],
      maxlength: 100,
    },
    curso: {
      type: String,
      required: [true, 'Por favor, forneça curso'],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ['Atual', 'Anterior'],
      default: 'pendente',
    },
    dataInicioGraduacao: {
      type: String
    },
    dataFimGraduacao: {
      type: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, forneça o usuário'],
    },
  },
  { timestamps: true }
)


export default mongoose.model('Grad', GradSchema)