import User from "../database/schemas/User"
import { Request, Response } from "express"
import PerfilProfissional from "../database/schemas/PerfilProfissional"


class PerfilProfissonalController {
    async createPerfilProfissional(request: Request, response: Response) {
        const { idPerfil, empresa, cargo, anoInicio, anoSaida, cidade, pais } = request.body

        try {
            const userIdExists = await User.findOne({ idPerfil })

            if (!userIdExists) {
                return response.status(422).json({ 
                    error: "Oops",
                    message: "Id not exists"
                })
            }

            const userPerfilProfissional = await PerfilProfissional.create({ idPerfil, empresa, cargo, anoInicio, anoSaida, cidade, pais })

            return response.status(201).json({
                message: "User perfil profissional created successfully"
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration fail",
                message: error
            })
        }
    }

    async findAllPerfilProfissional(request: Request, response: Response) {
        try {
            const users = await PerfilProfissional.find()

            return response.status(201).json(users)
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

    async findPerfilProfissonal(request: Request, response: Response) {
        const { idPerfil } = request.body
        
        try {
            const userId = await PerfilProfissional.findOne({ idPerfil: idPerfil })
            
            if (!userId) {
                return response.status(404).json({ 
                    error: "Oops",
                    message: "Id not exists"
                })
            }            
            
            return response.status(201).json(userId)
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

}

export default new PerfilProfissonalController()