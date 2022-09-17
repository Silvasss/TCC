import Router from "express"
import PerfilAcademicoController from "./controller/PerfilAcademicoController"
import PerfilProfissonalController from "./controller/PerfilProfissonalController"
import UserController from "./controller/UserController"


const routes = Router()

// POST
routes.post("/user", UserController.create)

routes.post("/auth", UserController.auth)

routes.post("/findUser", UserController.findUser)

routes.post("/createPerfilAcademico", PerfilAcademicoController.createPerfilAcademico)

routes.post("/createPerfilProfissional", PerfilProfissonalController.createPerfilProfissional)

routes.post("/findPerfilAcademico", PerfilAcademicoController.findPerfilAcademico)

routes.post("/findPerfilProfissonal", PerfilProfissonalController.findPerfilProfissonal)

// GET

routes.get("/findAllUsers", UserController.findAllUsers)

routes.get("/findAllPerfilAcademico", PerfilAcademicoController.findAllPerfilAcademico)

routes.get("/findAllPerfilProfissional", PerfilProfissonalController.findAllPerfilProfissional)


export default routes