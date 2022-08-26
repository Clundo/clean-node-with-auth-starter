import {IAccountPublicEntity} from "../domain/interfaces/IAccountPublicEntity";

export interface IAccountPresenter {
    getOne: (id: string) => Promise<IAccountPublicEntity | null>
}