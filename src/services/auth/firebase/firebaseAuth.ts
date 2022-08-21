import admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";
import {ServerError, UnauthorizedError} from "../../../lib/errors";



export class FirebaseAuth {
    constructor() {
    }

    initAuth = () => {
       const serviceAccount = {
           "type": "service_account",
           "project_id": process.env.PROJECT_ID,
           "private_key_id": process.env.PRIVATE_KEY_ID,
           "private_key": process.env.PRIVATE_KEY,
           "client_email": process.env.CLIENT_EMAIL,
           "client_id": process.env.CLIENT_ID,
           "auth_uri": "https://accounts.google.com/o/oauth2/auth",
           "token_uri": "https://oauth2.googleapis.com/token",
           "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
           "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL

       }
       console.log(serviceAccount, process.env.PROJECT_ID)
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
