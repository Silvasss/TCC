import mongoose from 'mongoose'


const GradSchema = new mongoose.Schema(
  {
    instituicao: {
      type: String,
      required: [true, 'Please provide instituicao'],
      maxlength: 100,
    },
    curso: {
      type: String,
      required: [true, 'Please provide curso'],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ['finalizada', 'cursando', 'trancada', 'pendente', 'recusada'],
      default: 'pendente',
    },
    gradType: {
      type: String,
      enum: ['presencial', 'semipresencial', 'EaD'],
      default: 'presencial',
    },
    gradLocation: {
      type: String,
      default: 'Brasil',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)


export default mongoose.model('Grad', GradSchema)