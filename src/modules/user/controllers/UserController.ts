import {IUserController} from "./IUserController";
import {_CreateUser} from "../use-cases/_CreateUser";
import {DatabaseService, IdService} from "../../../config/dependencies";
import {IUserRepository} from "../domain/interfaces/IUserRepository";
import {IId} from "../../../interfaces/IId";
import {_UpdateUser} from "../use-cases/_UpdateUser";
import {_DeleteUser} from "../use-cases/_DeleteUser";
import {_GetUserById} from "../use-cases/_GetUserById";
import {_GetUserByAuthId} from "../use-cases/_GetUserByAuthId";

interface CreateProps {
    firstName: string,
    lastName: string,
    authId: string,
    email: string
    accountId: string
    roleId: string
}

interface UpdateProps {
    firstName: string,
    lastName: string,
    id: string
}



export class UserController implements IUserController {
    UserRepository: IUserRepository
    Id: IId

    constructor() {
        this.UserRepository = DatabaseService && DatabaseService.userRepository
        this.Id = IdService
    }

    async create({firstName, lastName, email, authId, accountId, roleId}: CreateProps) {
        return await _CreateUser(
            {Id: this.Id, UserRepository: this.UserRepository}
        ).Execute({firstName, lastName, email, authId, accountId, roleId})


    }

    async update({firstName, lastName, id}: UpdateProps) {
        return await _UpdateUser(
            {UserRepository: this.UserRepository}
        ).Execute({firstName, lastName, id})


    }

    async delete( id: string) {
        return await _DeleteUser(
            {UserRepository: this.UserRepository}
        ).Execute({id})
    }

    async getOne( id: string) {
        return await _GetUserById(
            {UserRepository: this.UserRepository}
        ).Execute({id})
    }

    async getOneByAuthId( authId: string) {
        return await _GetUserByAuthId(
            {UserRepository: this.UserRepository}
        ).Execute({authId})
    }

}