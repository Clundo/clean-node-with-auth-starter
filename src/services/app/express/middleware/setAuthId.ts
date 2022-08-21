import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../../../config/dependencies";
import {UnauthorizedError} from "../../../../lib/errors";

const setAuthId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idToken = req.headers.authorization
        if (!idToken) throw new UnauthorizedError('not authenticated')
        const authId = await AuthService.verifyToken(idToken)

        if (!authId) throw new UnauthorizedError('not authenticated')
        req.authId = authId
        next()
    } catch (error) {
        next(error)
    }
}

export default setAuthId