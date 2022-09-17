import UserPerfilAcademico from "../database/schemas/PerfilAcademico"
import { Request, Response } from "express"
import PerfilAcademico from "../database/schemas/PerfilAcademico"
import User from "../database/schemas/User"


class PerfilAcademicoController {

    async createPerfilAcademico(request: Request, response: Response) {
        const { idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida } = request.body

        try {
            const userIdExists = await User.findOne({ idPerfil })

            if (!userIdExists) {
                return response.status(422).json({ 
                    error: "Oops",
                    message: "Id not exists"
                })
            }

            const userPerfilAcademico = await PerfilAcademico.create({ idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida })

            return response.status(201).json({
                message: "User perfil academico created successfully"
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration fail",
                message: error
            })
        }
    }

    async findAllPerfilAcademico(request: Request, response: Response) {
        try {
            const users = await UserPerfilAcademico.find()

            return response.status(201).json(users)
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
    }

    async findPerfilAcademico(request: Request, response: Response) {
        const { idPerfil } = request.body
        
        try {
            const userId = await UserPerfilAcademico.findOne({ idPerfil: idPerfil })
            
            if (!userId) {
                return response.status(404).json({ 
                    error: "Oops",
                    message: "Something wrong happened, try again"
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

export default new PerfilAcademicoController()