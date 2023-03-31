import mongoose from 'mongoose'


const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Por favor, forneça empresa'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Por favor, forneça posição'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Atual', 'Anterior'],
      default: 'Anterior',
    },
    jobType: {
      type: String,
      enum: ['Tempo integral', 'Tempo parcial', 'Remoto', 'Estágio'],
      default: 'Tempo integral',
    },
    jobLocation: {
      type: String,
      default: 'BR',
      required: true,
    },
    jobLocationEstado: {
      type: String
    },
    jobLocationCidade: {
      type: String
    },
    jobLocationLatitude: {
      type: String
    },
    jobLocationLongitude: {
      type: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, forneça usuário'],
    },
  },
  { timestamps: true }
)


export default mongoose.model('Job', JobSchema)