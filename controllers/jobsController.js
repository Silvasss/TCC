import { StatusCodes } from 'http-status-codes'

import checkPermissions from '../utils/checkPermissions.js'
import Job from '../models/Job.js'

import {
  BadRequestError,
  NotFoundError
} from '../errors/index.js'


const createJob = async (req, res) => {
  const { position, company } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }

  req.body.createdBy = req.user.userId

  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  }

  let result = Job.find(queryObject)
  
  // setup pagination
  const page = Number(req.query.page) || 1

  const limit = Number(req.query.limit) || 10

  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  
  const numOfPages = Math.ceil(totalJobs / limit)
  
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params

  const { company, position } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

  // check permissions
  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  await job.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const showStats = async (req, res) => {
  res.send('show stats') 
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats }