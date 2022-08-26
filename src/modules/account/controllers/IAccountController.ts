import {IAccountEntity} from "../domain/interfaces/IAccountEntity";
import {UpdateAccountProps} from "../use-cases/_UpdateAccount";

export interface IAccountController {
    create: (props: {name: string}) => Promise<IAccountEntity>

    update: (props: UpdateAccountProps) => Promise<IAccountEntity>

    delete: (id: string) => Promise<any>

    getOne: (id: string) => Promise<IAccountEntity | null>

}