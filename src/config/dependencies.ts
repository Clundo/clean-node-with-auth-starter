import {ExpressApp} from "../services/app/express/app";
import {FirebaseAuth} from "../services/auth/firebase/firebaseAuth";

export const AppService = new ExpressApp()
export const DatabaseService = null
export const AuthService = new FirebaseAuth()
export const IdService = null
