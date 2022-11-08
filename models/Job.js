import mongoose from 'mongoose'


const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Atual', 'Anterior'],
      default: 'Anterior',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'Tempo parcial', 'Remoto', 'Estágio'],
      default: 'full-time',
    },
    jobLocation: {
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


export default mongoose.model('Job', JobSchema)