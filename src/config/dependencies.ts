import {FirebaseAuth} from "../services/auth/firebase/firebaseAuth";
import {MongoDatabase} from "../services/database/mongoDb/MongoDatabase";
import {MongoId} from "../services/id/MongoId";


export const DatabaseService = new MongoDatabase()
export const AuthService = new FirebaseAuth()
export const IdService = new MongoId()

//cannot include app service here for some reason
