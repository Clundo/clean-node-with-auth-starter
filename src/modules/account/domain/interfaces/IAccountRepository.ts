import {IAccountEntity} from "./IAccountEntity";

export interface IAccountRepository {
    create: (accountInstance: IAccountEntity) => Promise<IAccountEntity>

    update: (accountInstance: IAccountEntity) => Promise<IAccountEntity>

    delete: (accountId: string) => Promise<any>

    getOneById: (accountId: string) => Promise<IAccountEntity | null>

}