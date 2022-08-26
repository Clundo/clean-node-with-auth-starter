import express, {Application, ErrorRequestHandler} from "express";
import bodyParser from "body-parser";
import {IUserEntity} from "../../../modules/user/domain/interfaces/IUserEntity";
import userRoutes from "./routes/userRoutes";
import {IRoleEntity} from "../../../modules/role/domain/interfaces/IRoleEntity";

declare global {
    namespace Express {
        interface Request {
            authId: string,
            userRole: IRoleEntity | null
        }
    }
}


    export function initApp() {


        const app: Application = express();

        app.use(bodyParser.json())
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        )


        //routes go here

        //app.use(setAuthId)

        app.use('/users', userRoutes)

        app.use('*', (req, res, next) => {
            next(new Error('not found'))
        })

        const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
            console.log(err)
            res.status(err.status ?? 500).json({status: err.status ?? 500, message: err.message ?? 'Server Error'})
        }

        app.use(errorHandler)

        app.listen(process.env.port || 9000, () => {
            console.log('App connected')
        })
    }

