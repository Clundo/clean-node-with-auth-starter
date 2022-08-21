import admin from "firebase-admin";
import serviceAccount from "../../../firebase_service_key.json";
import {getAuth} from "firebase-admin/auth";
import {ServerError, UnauthorizedError} from "../../../lib/errors";


export class FirebaseAuth {
    constructor() {
    }

    initializeAuth = () => {
        admin.initializeApp({
            //@ts-ignore
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.AUTH_DOMAIN
        })
        console.log('Auth connected')
    }

    verifyToken = async (idToken: string) => {
        try {
            const decodedToken = await getAuth()
                .verifyIdToken(idToken)
            return decodedToken.uid
        } catch (error) {
            console.log(error)
            throw new UnauthorizedError();
        }
    }

    createUser = async ({email, password}: {email: string, password: string}) => {
        //check if email is in use
        const userRecord = await getAuth().createUser({email, password})
        if(!userRecord) throw new ServerError('Could not create user')
        return userRecord.uid
    }

}
