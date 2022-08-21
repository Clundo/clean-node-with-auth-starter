import {IBaseEntity} from "../../../../interfaces/IBaseEntity";

export interface IUserEntity extends IBaseEntity {
    firstName: string
    lastName: string
    email: string
    //id from auth service
    authId: string

    getPublicEntity():  {firstName: string, lastName: string, email: string}
}