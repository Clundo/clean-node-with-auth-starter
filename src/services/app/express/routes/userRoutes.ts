import {Router} from "express";
import {UserController} from "../../../../modules/user/controllers/UserController";
import {UserPresenter} from "../../../../modules/user/presenters/UserPresenter";
import {NotFoundError, ServerError, UnauthorizedError} from "../../../../lib/errors";
import {DatabaseService} from "../../../../config/dependencies";

const userRouter = Router()

const userController = new UserController()
const userPresenter = new UserPresenter()


userRouter.post('/', async (req, res) => {

    const {authId} = req

    const {firstName, lastName, email} = req.body

    const {id} = await userController.create({firstName, lastName, email, authId})

    const user = await userPresenter.getOne(id)

    res.status(201).send(user)

})

userRouter.put('/:id', async (req, res) => {

    const {id} = req.params

    const {firstName, lastName} = req.body

    const u = await userController.getOne(id)
    if(!u) throw new NotFoundError('Could not find user')
    if(u.authId !== req.authId) throw new UnauthorizedError()

    await userController.update({id, firstName, lastName})

    const user = await userPresenter.getOne(id)

    res.send(user)
})

userRouter.delete('/:id', async (req, res) => {

    const {id} = req.params

    const u = await userController.getOne(id)
    if(!u) throw new NotFoundError('Could not find user')
    if(u.authId !== req.authId) throw new UnauthorizedError()

    await userController.delete(id)

    const user = await userPresenter.getOne(id)

    if(user) throw new ServerError('Could not delete user')

    res.status(204).end()

})

userRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    const user = await userPresenter.getOne(id)

    res.send(user)
})

export default userRouter