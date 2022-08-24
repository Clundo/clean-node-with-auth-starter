
import {IDatabaseServices} from "../../../interfaces/IDatabaseServices";
import {IUserRepository} from "../../../modules/user/domain/interfaces/IUserRepository";
import {PrismaClient} from '@prisma/client'
import prisma from './prisma'
import {UserRepository} from "./modules/users/repository/UserRepository";


export class PrismaPGDatabase implements IDatabaseServices {
    userRepository: IUserRepository
    connection: PrismaClient | null

    constructor() {
        this.connection = null
        this.userRepository = new UserRepository(this.connection)
    }


    async initDatabase() {
        this.connection = prisma
        console.log('DB connected')

        const main = async () => {

        }

        main()
            .then(async () => {
                await this.connection?.$disconnect()
            })
            .catch(async (e) => {
                console.error(e)
                await this.connection?.$disconnect()
                process.exit(1)
            })

    }

    async closeDatabase() {
        try {
            await this.connection?.$disconnect()
        } catch(e) {
            console.error(e)
            await this.connection?.$disconnect()
            process.exit(1)
        }
    }

}
