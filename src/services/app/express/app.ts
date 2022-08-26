import express, {Application, ErrorRequestHandler} from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import {IRoleEntity} from "../../../modules/role/domain/interfaces/IRoleEntity";
import setUserRole from "./middleware/setUserRole";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";

declare global {
    namespace Express {
        interface Request {
            authId: string,
            userRole: IRoleEntity | null
        }
    }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('here be eroro')
    res.status(err.status ?? 500).json({status: err.status ?? 500, message: err.message ?? 'Server Error'})
}

export function initApp() {


    const app: Application = express();

    app.use(bodyParser.json())
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )

    //app.use(setAuthId)


    app.use('*', (req, res, next) => {
        req.authId = '1234567'
        next()
    })

    app.use(setUserRole)

    //routes go here
    app.use('/auth', authRoutes)
    app.use('/users', userRoutes)
    app.use('/accounts', accountRoutes)

    app.use('*', (req, res, next) => {
        next(new Error('not found'))
    })

    app.use(errorHandler)

    app.listen(process.env.port || 9000, () => {
        console.log('App connected')
    })
}

