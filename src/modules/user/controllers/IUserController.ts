import {IUserEntity} from "../domain/interfaces/IUserEntity";

export interface IUserController {
    create: (props: { firstName: string, lastName: string, email: string, authId: string, accountId: string, roleId: string }) => Promise<IUserEntity>

    update: (props: { firstName: string, lastName: string, id: string }) => Promise<IUserEntity>

    delete: (id: string) => Promise<any>

    getOne: (id: string) => Promise<IUserEntity | null>

    getOneByAuthId: (authId: string) => Promise<IUserEntity | null>

}