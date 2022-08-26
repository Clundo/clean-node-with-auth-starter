import {Router} from "express";
import {UnauthorizedError} from "../../../../lib/errors";
import {Interactor} from "../../../../interactors/Interactor";

const userRouter = Router()

const interactor = new Interactor()


userRouter.post('/', async (req, res, next) => {
    try {
        const userRole = req.userRole
        if (!userRole) throw new UnauthorizedError()
        const {firstName, lastName, email, password, roleId} = req.body
        const user = await interactor.createUser({firstName, lastName, email, password, userRole, roleId})
        res.status(201).send(user)
    } catch (e) {
        next(e)
    }
})

userRouter.put('/:id', async (req, res, next) => {
    try {
        const userRole = req.userRole
        if (!userRole) throw new UnauthorizedError()
        const {id} = req.params
        const {firstName, lastName} = req.body
        const user = await interactor.updateUser({userRole, firstName, lastName, id})
        res.send(user)
    } catch (e) {
        next(e)
    }

})

userRouter.delete('/:id', async (req, res, next) => {
    try {
        const userRole = req.userRole
        if (!userRole) throw new UnauthorizedError()
        const {id} = req.params
        await interactor.deleteUser({id, userRole})
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

userRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await interactor.getUser(id)

        res.send(user)
    } catch (e) {
        next(e)
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const user = await interactor.getUsers({userRole})
        res.send(user)
    } catch (e) {
        next(e)
    }
})

export default userRouter