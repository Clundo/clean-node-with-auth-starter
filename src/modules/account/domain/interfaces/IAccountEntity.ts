import {IBaseEntity} from "../../../../interfaces/IBaseEntity";
import {IAccountPublicEntity} from "./IAccountPublicEntity";

export interface IAccountEntity extends IBaseEntity {
    name: string
    addressLine1: string
    addressLine2: string
    postCode: string
    city: string
    state: string
    country: string
    phone: string
    email: string

    getPublicEntity: () => IAccountPublicEntity
}