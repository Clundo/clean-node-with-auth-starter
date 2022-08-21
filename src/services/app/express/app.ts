
import express, {Application, ErrorRequestHandler} from "express";
import bodyParser from "body-parser";

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

        app.get('/', (req, res) => {
            res.send('Hello')
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
