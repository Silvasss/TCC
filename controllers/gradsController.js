import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import checkPermissions from '../utils/checkPermissions.js'
import Grad from '../models/Grad.js'
import User from '../models/User.js'

import {
  BadRequestError,
  NotFoundError
} from '../errors/index.js'


const createGrad = async (req, res) => {
    const { curso, instituicao } = req.body

    if (!curso || !instituicao) {
        throw new BadRequestError('Please provide all values')
    }
    
    req.body.createdBy = req.user.userId

    const grad = await Grad.create(req.body)

    res.status(StatusCodes.CREATED).json({ grad })
}

const getAllGrads = async (req, res) => {
    const { status, gradType, sort, search } = req.query

    const queryObject = {
        createdBy: req.user.userId,
    }

    if (status && status !== 'todos') {
        queryObject.status = status
    }

    if (gradType && gradType !== 'todos') {
        queryObject.gradType = gradType
    }

    if (search) {
        queryObject.curso = { $regex: search, $options: 'i' }
    }

    let result = Grad.find(queryObject)

    if (sort === 'ultimo') {
        result = result.sort('-createdAt')
    }

    if (sort === 'antigo') {
        result = result.sort('createdAt')
    }

    if (sort === 'a-z') {
        result = result.sort('position')
    }

    if (sort === 'z-a') {
        result = result.sort('-position')
    }

    // setup pagination
    const page = Number(req.query.page) || 1

    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const grads = await result

    const totalGrads = await Grad.countDocuments(queryObject)

    const numOfPages = Math.ceil(totalGrads / limit)

    res.status(StatusCodes.OK).json({ grads, totalGrads, numOfPages })
}

const getAllEgressosGrads = async (req, res) => {    
    // Informações das instituições cadastradas pelo usuário 
    let result = Grad.find({createdBy: req.user.userId})
    
    // --------setup pagination-------------
    // NÃO FUNCIONA
    const page = Number(req.query.page) || 1

    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    // -------------------------------------

    // Coleção com todos os valores do objeto "grads"
    let grads = await result    
    
    // Lista com os nomes das instituições
    const arrayNomesInstituicoes = []    

    // Percorrendo cada posição do objeto "grads" e pegando os nomes das instituições
    grads.forEach(function (arrayItem) {
        arrayNomesInstituicoes.push(arrayItem.instituicao)
    })

    // Lista com todos os egressos que estudaram na mesma faculdade
    const arrayFinal = []

    // Adicionando na lista todos os egressos filtrado da mesma instituição
    arrayNomesInstituicoes.forEach(async function (arrayItem) {
        const result2 = await Grad.find({instituicao : {$regex: arrayItem, $options: 'i'}}) 

        arrayFinal.push(result2)
    })
    
    // Lista com todos os egressos exceto o usuário da conta
    const arrayFinalEgressos = []    
    
    setTimeout(() => {
        // Filtrado ambas listas criadas nas duas funcões anteriores
        arrayFinal.forEach(function (arrayItem) {            
            arrayItem.forEach(function (arrayItem2) {
                if (JSON.stringify(arrayItem2.createdBy) !== JSON.stringify(req.user.userId)) {                   
                    arrayFinalEgressos.push(arrayItem2)
                }                
            })
            
        })

        // --Filtrando da maneira errada!!--
        grads = arrayFinalEgressos

        const totalGrads = arrayFinalEgressos.length 

        const numOfPages = Math.ceil(totalGrads / limit)
        // ---------------------------------

        res.status(StatusCodes.OK).json({ grads, totalGrads, numOfPages })
    }, 1000)    
}

const updateGrad = async (req, res) => {
    const { id: gradId } = req.params

    const { instituicao, curso } = req.body

    if (!curso || !instituicao) {
        throw new BadRequestError('Please provide all values')
    }

    const grad = await Grad.findOne({ _id: gradId })

    if (!grad) {
        throw new NotFoundError(`No grad with id :${gradId}`)
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
        throw new NotFoundError(`No grad with id :${gradId}`)
    }

    checkPermissions(req.user, grad.createdBy)

    await grad.remove()

    res.status(StatusCodes.OK).json({ msg: 'Success! Grad removed' })
}

const showStats = async (req, res) => {    
    let stats = await Grad.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
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


export { createGrad, deleteGrad, getAllGrads, updateGrad, showStats, getAllEgressosGrads }