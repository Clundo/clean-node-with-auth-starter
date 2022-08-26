
import {IDatabaseServices} from "../../../interfaces/IDatabaseServices";
import {IUserRepository} from "../../../modules/user/domain/interfaces/IUserRepository";
import {PrismaClient} from '@prisma/client'
import prisma from './prisma'
import {UserRepository} from "./modules/users/repository/UserRepository";
import {RoleRepository} from "./modules/users/repository/RoleRepository";
import {IRoleRepository} from "../../../modules/role/domain/interfaces/IRoleRepository";
import {IAccountRepository} from "../../../modules/account/domain/interfaces/IAccountRepository";
import {AccountRepository} from "./modules/users/repository/AccountRepository";


export class PrismaPGDatabase implements IDatabaseServices {
    userRepository: IUserRepository
    roleRepository: IRoleRepository
    accountRepository: IAccountRepository
    connection: PrismaClient | null

    constructor() {
        this.connection = null
        this.userRepository = new UserRepository()
        this.accountRepository = new AccountRepository()
        this.roleRepository = new RoleRepository()
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
