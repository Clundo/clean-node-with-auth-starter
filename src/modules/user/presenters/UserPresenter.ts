import {DatabaseService, IdService} from "../../../config/dependencies";
import {IUserRepository} from "../domain/interfaces/IUserRepository";
import {IId} from "../../../interfaces/IId";
import {_GetUserById} from "../use-cases/_GetUserById";
import {IUserPresenter} from "./IUserPresenter";
import {IDatabaseServices} from "../../../interfaces/IDatabaseServices";


export class UserPresenter implements IUserPresenter {
    UserRepository: IUserRepository
    Id: IId

    constructor() {
        this.UserRepository = DatabaseService?.userRepository
        this.Id = IdService
    }

    async getOne(id: string) {
        const user = await _GetUserById(
            {UserRepository: this.UserRepository}
        ).Execute({id})

        return user?.getPublicEntity() ?? null
    }

}