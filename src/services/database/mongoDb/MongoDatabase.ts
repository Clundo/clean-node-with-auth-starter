import mongoose, {Connection} from "mongoose";
import {IDatabaseServices} from "../../../interfaces/IDatabaseServices";
import {UserRepository} from "./modules/users/repository/UserRepository";
import {IUserRepository} from "../../../modules/user/domain/interfaces/IUserRepository";


export class MongoDatabase implements IDatabaseServices {
    connection: any | null
    db: Connection | null
    userRepository: IUserRepository

    constructor() {
        this.connection = null
        this.db = null
        this.userRepository = new UserRepository()
    }


    async initDatabase() {
        const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_URI}/`

        if(!this.connection) await mongoose.connect(url + process.env.DB_NAME, {
                //@ts-ignore
                useNewUrlParser: true
            }
        ).then((connection) => {
            this.connection = connection
            console.log("DB connected");

        }).catch((err: any) => {
            throw new Error(err)
        })

        this.db = this.db ?? mongoose.connection
        return this.db
    }

    async closeDatabase() {
        await this.db?.close()
    }

}
