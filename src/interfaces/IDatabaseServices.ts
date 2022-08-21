import {IUserRepository} from "../modules/user/domain/interfaces/IUserRepository";

export interface IDatabaseServices {
    initDatabase: () => Promise<any>
    userRepository: IUserRepository
}