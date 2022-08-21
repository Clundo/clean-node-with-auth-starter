import {IUserPublicEntity} from "../domain/interfaces/IUserPublicEntity";

export interface IUserPresenter {
    getOne: (id: string) => Promise<IUserPublicEntity | null>
}