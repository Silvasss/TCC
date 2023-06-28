import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import checkPermissions from '../utils/checkPermissions.js'

import Grad from '../models/Grad.js'
import Job from '../models/Job.js'
import User from '../models/User.js'
import Instituicao from '../models/Instituicao.js'

import {
  BadRequestError,
  NotFoundError
} from '../errors/index.js'


const createGrad = async (req, res) => {
    const { curso, instituicao } = req.body
    
    console.log(req.body)

    if (!curso || !instituicao) {
        throw new BadRequestError('Forneça todos os valores')
    }
    
    req.body.createdBy = req.user.userId

    const grad = await Grad.create(req.body)

    res.status(StatusCodes.CREATED).json({ grad })
}

// Todas as instituições do usuário cadastradas no banco
const getAllGrads = async (req, res) => {    
    const { status, sort, search } = req.query
    
    const queryObject = {
        createdBy: req.user.userId,
    }

    if (status && status !== 'Todos') {
        queryObject.statusGrad = statusGrad
    }

    if (search) {
        queryObject.instituicao = { $regex: search, $options: 'i' }
    }

    let result = Grad.find(queryObject)

    const instituicoesDados = await Instituicao.find()

    if (sort === 'Recentes') {
        result = result.sort('-createdAt')
    }

    if (sort === 'Antigos') {
        result = result.sort('createdAt')
    }

    if (sort === 'A-Z') {
        result = result.sort('position')
    }

    if (sort === 'Z-A') {
        result = result.sort('-position')
    }

    // setup pagination
    const page = Number(req.query.page) || 1

    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const userGrads = await result

    const totalUserGrads = await Grad.countDocuments(queryObject)

    const numOfPages = Math.ceil(totalUserGrads / limit)

    res.status(StatusCodes.OK).json({ userGrads, totalUserGrads, numOfPages, instituicoesDados })
}

// Todas as instituições cadastradas no banco
const getAllEgressosGrads = async (req, res) => {       
    const { status, sort, search } = req.query
 
    const queryObject = {
        // Exceto as do usuário
        createdBy: {$nin: req.user.userId},
    }

    if (status && status !== 'Todos') {
        queryObject.status = status
    }

    if (search) {
        queryObject.instituicao = { $regex: search, $options: 'i' }
    }

    let result = Grad.find(queryObject)

    if (sort === 'Recentes') {
        result = result.sort('-createdAt')
    }

    if (sort === 'Antigos') {
        result = result.sort('createdAt')
    }

    if (sort === 'A-Z') {
        result = result.sort('position')
    }

    if (sort === 'Z-A') {
        result = result.sort('-position')
    }
    
    // --------setup pagination-------------    
    const page = Number(req.query.page) || 1

    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    // -------------------------------------

    // Coleção com todos os valores do objeto "grads"
    let allGrads = await result            
    
    allGrads = [...new Map(allGrads.map(v => [v.nomeEgresso, v])).values()]

    const totalAllGrads = allGrads.length
    
    const numOfPages = Math.ceil(totalAllGrads / limit)
    
    res.status(StatusCodes.OK).json({ allGrads, totalAllGrads, numOfPages })     
}

const updateGrad = async (req, res) => {
    const { id: gradId } = req.params

    const { instituicao, curso } = req.body

    if (!curso || !instituicao) {
        throw new BadRequestError('Forneça todos os valores')
    }

    const grad = await Grad.findOne({ _id: gradId })

    if (!grad) {
        throw new NotFoundError(`Sem graduação com id: ${gradId}`)
    }

    // check permissions
    checkPermissions(req.user, grad.createdBy)

    const updatedGrad = await Grad.findOneAndUpdate({ _id: gradId }, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({ updatedGrad }) 
}

const deleteGrad = async (req, res) => {
    const { id: gradId } = req.params

    const grad = await Grad.findOne({ _id: gradId })

    if (!grad) {
        throw new NotFoundError(`Sem graduação com id: ${gradId}`)
    }

    checkPermissions(req.user, grad.createdBy)

    await grad.remove()

    res.status(StatusCodes.OK).json({ msg: 'Sucesso! Graduação removida' })
}

const showStats = async (req, res) => {    
    let stats = await Grad.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$statusInstituicao', count: { $sum: 1 } } },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr

        acc[title] = count

        return acc
    }, {})

    const defaultStats = {
        pending: stats.pendente || 0,
        declined: stats.recusada || 0,
    }

    res.status(StatusCodes.OK).json({ defaultStats })
}

// Retorna as informações do egresso sobre instituições e experiências
const getDadosEgresso = async (req, res) => {
    const { id: egressoId } = req.params

    const queryObject = {
        createdBy: egressoId,
    }

    const egressoDadosAllGrads = await Grad.find(queryObject)

    const { name, location, nomePais, locationEstado, locationCidade } = await User.findOne({_id: egressoId})

    const egressoDadosAllJobs = await Job.find(queryObject)

    const egressoNome = name

    const egressoListaLocalizacao = [location, nomePais, locationEstado, locationCidade]

    res.status(StatusCodes.OK).json({ egressoDadosAllGrads, egressoNome, egressoDadosAllJobs, egressoListaLocalizacao })
}

const updatedGradPendencia = async (req, res) => {
    const {id, textoMotivo } = req.body
    
    const grad = await Grad.findOne({ _id: id })
    
    grad.justificativaUsuario = textoMotivo
    
    grad.emAnalisePendencia = true
    
    await grad.save()

    res.status(StatusCodes.OK)
}


export { createGrad, deleteGrad, getAllGrads, updateGrad, showStats, getAllEgressosGrads, getDadosEgresso, updatedGradPendencia }