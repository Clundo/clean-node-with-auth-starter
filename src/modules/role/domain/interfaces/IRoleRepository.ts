import {IRoleEntity} from "./IRoleEntity";

export interface IRoleRepository {
    create: (roleInstance: IRoleEntity) => Promise<IRoleEntity>

    update: (roleInstance: IRoleEntity) => Promise<IRoleEntity>

    delete: (roleId: string) => Promise<any>

    getOneById: (roleId: string) => Promise<IRoleEntity | null>

    getOneByNameAndAccountId: (name: string, accountId: string) => Promise<IRoleEntity | null>

    getManyByAccountId: (accountId: string) => Promise<IRoleEntity[]>

}