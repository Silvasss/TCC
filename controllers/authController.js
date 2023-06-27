import { StatusCodes } from 'http-status-codes'

import User from '../models/User.js'

import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'


const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Forneça todos os valores')
  }
 
  if (name.length < 3 || name.length > 150) {
    throw new BadRequestError('Tamanho mínimo de 3 e máximo de 150 caracteres para o nome')
  }
  
  if (password.length < 6) {
    throw new BadRequestError('Tamanho mínimo da senha 6 caracteres')
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    throw new BadRequestError('Email já em uso')
  }

  const user = await User.create({ name, email, password })

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      location: user.location,
      name: user.name,
      _id: user._id
    },
    token,
    location: user.location,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Forneça todos os valores')
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new UnAuthenticatedError('Credenciais inválidas')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Credenciais inválidas')
  }

  const token = user.createJWT()

  user.password = undefined

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  const { email, name, locationPais, locationEstado, locationCidade, nomePais } = req.body
  
  if (!email || !name || !locationPais) {
    throw new BadRequestError('Forneça todos os valores')
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name
  user.location = locationPais
  user.nomePais = nomePais
  user.locationEstado = locationEstado
  user.locationCidade = locationCidade

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}


export { register, login, updateUser }