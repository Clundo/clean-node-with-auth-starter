import {ExpressApp} from "../services/app/express/app";
import {FirebaseAuth} from "../services/auth/firebase/firebaseAuth";
import {MongoDatabase} from "../services/database/mongoDb/MongoDatabase";
import {MongoId} from "../services/id/MongoId";

export const AppService = new ExpressApp()
export const DatabaseService = new MongoDatabase()
export const AuthService = new FirebaseAuth()
export const IdService = new MongoId()
