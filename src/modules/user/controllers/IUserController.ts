import {IUserEntity} from "../domain/interfaces/IUserEntity";

export interface IUserController {
    create: ({firstName, lastName, email, authId}: { firstName: string, lastName: string, email: string, authId: string }) => Promise<IUserEntity>

    update: ({firstName, lastName, id}: {firstName: string, lastName: string, id: string}) => Promise<IUserEntity>

    delete: (id: string) => Promise<any>

    getOne: (id: string) => Promise<IUserEntity | null>

}