import dotenv from "dotenv";
import {AuthService, DatabaseService} from "./src/config/dependencies";
import {initApp} from "./src/services/app/express/app";


    dotenv.config();
    AuthService.initAuth()
    DatabaseService.initDatabase()

    initApp()


