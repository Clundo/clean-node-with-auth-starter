import {Router} from "express";
import {Interactor} from "../../../../interactors/Interactor";
import {UnauthorizedError} from "../../../../lib/errors";

const accountRouter = Router()

const interactor = new Interactor()

accountRouter.get('/', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const account = await interactor.getAccount({userRole})
        res.send(account)
    } catch (e) {
        next(e)
    }
})

accountRouter.put('/', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const {
            id,
            name,
            vatNumber,
            addressLine1,
            addressLine2,
            postCode,
            city,
            state,
            country,
            phone,
            email,
        } = req.body
        const account = await interactor.updateAccount({userRole, name,
            id,
            vatNumber,
            addressLine1,
            addressLine2,
            postCode,
            city,
            state,
            country,
            phone,
            email,})

        res.send(account)

    } catch (e) {
        next(e)
    }
})

export default accountRouter