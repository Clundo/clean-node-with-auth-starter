import {IUserRepository} from "../modules/user/domain/interfaces/IUserRepository";
import {IAccountRepository} from "../modules/account/domain/interfaces/IAccountRepository";
import {IRoleRepository} from "../modules/role/domain/interfaces/IRoleRepository";

export interface IDatabaseServices {
    initDatabase: () => Promise<any>
    userRepository: IUserRepository
    accountRepository: IAccountRepository
    roleRepository: IRoleRepository
}