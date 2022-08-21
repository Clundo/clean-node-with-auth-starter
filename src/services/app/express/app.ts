
import express, {Application, ErrorRequestHandler} from "express";
import bodyParser from "body-parser";
import {UserController} from "../../../modules/user/controllers/UserController";
import setAuthId from "./middleware/setAuthId";
import {IUserEntity} from "../../../modules/user/domain/interfaces/IUserEntity";

declare global {
    namespace Express {
        interface Request {
            authId: string,
            currentUser: IUserEntity | null
        }
    }
}

export class ExpressApp {

    constructor() {

    }
    initApp() {


        const app: Application = express();

        app.use(bodyParser.json())
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        )


        //routes go here

        app.use(setAuthId)

        app.get('/',async (req, res) => {
            const controller = new UserController()

            const user = await controller.getOne('63029a6478dc2948daabb2c2')
            console.log(user)
            res.send(user)
        })

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
}
