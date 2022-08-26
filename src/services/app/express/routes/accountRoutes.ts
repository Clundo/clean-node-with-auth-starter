import {Router} from "express";
import {Interactor} from "../../../../interactors/Interactor";
import {UnauthorizedError} from "../../../../lib/errors";

const accountRouter = Router()

const interactor = new Interactor()

accountRouter.get('/', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        return await interactor.getAccount({userRole})
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
        await interactor.updateAccount({userRole, name,
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

        return await interactor.getAccount({userRole})
    } catch (e) {
        next(e)
    }
})