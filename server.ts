import dotenv from "dotenv";
import {AuthService, DatabaseService} from "./src/config/dependencies";
import app from "./src/services/app/express/app";


    dotenv.config();
    AuthService.initAuth()
    DatabaseService.initDatabase()

    app.listen(process.env.port || 9000, () => {
        console.log('App connected')
    })


