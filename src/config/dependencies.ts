import {FirebaseAuth} from "../services/auth/firebase/firebaseAuth";
import {MongoDatabase} from "../services/database/mongoDb/MongoDatabase";
import {MongoId} from "../services/id/MongoId";
import {Cuid} from "../services/id/Cuid";
import {PrismaPGDatabase} from "../services/database/postgreSQL/PrismaPGDatabase";


export const DatabaseService = new PrismaPGDatabase()
export const AuthService = new FirebaseAuth()
export const IdService = new Cuid()

//cannot include app service here for some reason
