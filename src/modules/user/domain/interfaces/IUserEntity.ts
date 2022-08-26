import {IBaseEntity} from "../../../../interfaces/IBaseEntity";
import {IUserPublicEntity} from "./IUserPublicEntity";

export interface IUserEntity extends IBaseEntity {
    firstName: string
    lastName: string
    email: string
    //id from auth service
    authId: string
    accountId: string
    roleId: string

    getPublicEntity: () => IUserPublicEntity
}