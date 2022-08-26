import {Router} from "express";
import {UnauthorizedError} from "../../../../lib/errors";
import {Interactor} from "../../../../interactors/Interactor";

const roleRouter = Router()

const interactor = new Interactor()

roleRouter.get('/', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const roles = await interactor.getRoles({userRole})
        res.send(roles)
    }catch (e) {
        next(e)
    }
})

roleRouter.post('/', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const {name, permissions} = req.body
        const newRole = {name, permissions, accountId: userRole.accountId}
        const role = await interactor.createRole({userRole, newRole})
        res.send(role)
    }catch (e) {
        next(e)
    }
})

roleRouter.put('/:id', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const {id} = req.params
        const {name, permissions} = req.body
        const roleToUpdate = {id, name, permissions, accountId: userRole.accountId}
        const role = await interactor.updateRole({userRole, roleToUpdate})
        res.send(role)
    }catch (e) {
        next(e)
    }
})

roleRouter.delete('/:id', async (req, res, next) => {
    try {
        const {userRole} = req
        if (!userRole) throw new UnauthorizedError()
        const {id} = req.params
        const {name, permissions} = req.body
        const roleToUpdate = {id, name, permissions, accountId: userRole.accountId}
        const role = await interactor.updateRole({userRole, roleToUpdate})
        res.send(role)
    }catch (e) {
        next(e)
    }
})