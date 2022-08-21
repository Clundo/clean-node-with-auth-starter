import mongoose, {Connection} from "mongoose";
import {IDatabaseServices} from "../../../interfaces/IDatabaseServices";


export class MongoDatabase implements IDatabaseServices {
    connection: void | null
    db: Connection | null

    constructor() {
        this.connection = null
        this.db = null
    }


    async initDatabase() {
        const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_URI}/`
        console.log(process.env.DB_NAME)
        this.connection = this.connection ?? await mongoose.connect(url + process.env.DB_NAME, {
                //@ts-ignore
                useNewUrlParser: true
            }
        ).then(() => {
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