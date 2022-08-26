import {IUserEntity} from "./IUserEntity";

export interface IUserRepository {
    create: (userInstance: IUserEntity) => Promise<IUserEntity>

    update: (userInstance: IUserEntity) => Promise<IUserEntity>

    delete: (userId: string) => Promise<any>

    getOneById: (userId: string) => Promise<IUserEntity | null>

    getOneByEmail: (email: string) => Promise<IUserEntity | null>

    getOneByAuthId: (authId: string) => Promise<IUserEntity | null>

    getAccountUsers: (accountId: string) => Promise<IUserEntity[]>
}