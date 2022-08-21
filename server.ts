import dotenv from "dotenv";
import {AuthService, DatabaseService, AppService} from "./src/config/dependencies";

dotenv.config();

AppService.initApp()
AuthService.initAuth()
/*
DatabaseService.initDatabase()*/
