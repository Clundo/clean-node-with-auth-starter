import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../../../config/dependencies";
import {UnauthorizedError} from "../../../../lib/errors";
import {Interactor} from "../../../../interactors/Interactor";

const setUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const interactor = new Interactor()
        const authId = req.authId

        const userRole = await interactor.getUserRole(authId)

        if(userRole)  {
            req.userRole = userRole
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default setUserRole