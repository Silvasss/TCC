import { StatusCodes } from 'http-status-codes'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

import User from '../models/User.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

dotenv.config()

// The Supabase client is your entrypoint to the rest of the Supabase functionality and is the 
// easiest way to interact with everything we offer within the Supabase ecosystem.

const register = async (req, res) => {
  const { name, email, password } = req.body

  const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_KEY)


  if (!name || !email || !password) {
    throw new BadRequestError('Forneça todos os valores')
  }
 
  if (name.length < 3 || name.length > 150) {
    throw new BadRequestError('Tamanho mínimo de 3 e máximo de 150 caracteres para o nome')
  }
  
  if (password.length < 6) {
    throw new BadRequestError('Tamanho mínimo da senha 6 caracteres')
  }

  const { error } = await supabase.auth.signUp({name, email, password})
  
  if (error != null && error.message === "User already registered") {
    throw new BadRequestError('Email já em uso')
  }
    
  //const { data } = await supabase.auth.getSession()

  console.log(await supabase.auth.getSession())

  // const token = user.createJWT()

  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     email: user.email,
  //     lastName: user.lastName,
  //     location: user.location,
  //     name: user.name,
  //   },
  //   token,
  //   location: user.location,
  // })
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
  const { email, name, lastName, location } = req.body

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Forneça todos os valores')
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}


export { register, login, updateUser }