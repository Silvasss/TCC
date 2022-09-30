import User from "../database/schemas/User"
import { Request, Response } from "express"
import bcrypt from "bcrypt"


class UserController {

    async create(request: Request, response: Response) {
        const { name, email, password, cidade, pais } = request.body

        try {
            const userExists = await User.findOne({ email })

            if (userExists) {
                return response.status(422).json({ 
                    error: "Oops",  
                    message: "User already exists"
                })
            }

            const user = await User.create({ name, email, password, cidade, pais })

            return response.status(200).json({user})
        } catch (error) {
            return response.status(500).json({
                error: "Registration fail",
                message: error
            })
        }
    }

    async findAllUsers(request: Request, response: Response) {
        try {
            const users = await User.find()

            return response.status(201).json(users)
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

    async findUser(request: Request, response: Response) {
        const { id } = request.body

        try {
            const user = await User.findById(id)

            if (!user) {
                return response.status(404).json({ 
                    error: "Oops",
                    message: "Something wrong happened, try again"
                })
            }            
            
            return response.status(200).json({
                "message": "User acess successfully", user
            })
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

    async auth(request: Request, response: Response) {
        const { email, password } = request.body
        
        try {
            const userExists = await User.findOne({ email })
            
            if (!userExists) {
                return response.status(404).json({ 
                    error: "Oops",
                    message: "Something wrong happened, try again"
                })
            }

            const checkPassword = await bcrypt.compare(password, userExists.password)

            if (!checkPassword) {
                return response.status(404).json({ 
                    error: "Oops",
                    message: "Something wrong happened, try again"
                })
            }

            return response.status(200).json({
                "message": "User acess successfully", userExists
            })

        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }
}

export default new UserController()