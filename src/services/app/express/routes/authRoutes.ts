import {Router} from "express";
import {Interactor} from "../../../../interactors/Interactor";

const authRouter = Router()

const interactor = new Interactor()


authRouter.post('/', async (req, res, next) => {

    try {
        const {authId} = req
        const {firstName, lastName, email} = req.body
        const user = await interactor.signUp({firstName, lastName, email, authId})
        res.status(201).send(user)
    } catch (e) {
        next(e)
    }


})

export default authRouter