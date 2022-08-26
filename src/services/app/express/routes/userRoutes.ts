import {Router} from "express";
import {UserController} from "../../../../modules/user/controllers/UserController";
import {UserPresenter} from "../../../../modules/user/presenters/UserPresenter";
import {NotFoundError, ServerError, UnauthorizedError} from "../../../../lib/errors";
import {DatabaseService} from "../../../../config/dependencies";
import {Interactor} from "../../../../interactors/Interactor";

const userRouter = Router()

const interactor = new Interactor()


userRouter.post('/', async (req, res) => {
    console.log(req.body)
    //const {authId} = req

    const {firstName, lastName, email} = req.body

    const authId = (Math.random() * 1000000).toString()

    const user = await interactor.signUp({firstName, lastName, email, authId})

    res.status(201).send(user)

})

userRouter.put('/:id', async (req, res) => {

    const userRole = req.userRole

    if(!userRole) throw new UnauthorizedError()

    const {id} = req.params

    const {firstName, lastName} = req.body

    const user = await interactor.updateUser({userRole, firstName, lastName, id})

    res.send(user)
})

userRouter.delete('/:id', async (req, res) => {

    const userRole = req.userRole

    if(!userRole) throw new UnauthorizedError()

    const {id} = req.params

   await interactor.deleteUser({id, userRole})

    res.status(204).end()

})

userRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    const user = await interactor.getUser(id)

    res.send(user)
})

export default userRouter