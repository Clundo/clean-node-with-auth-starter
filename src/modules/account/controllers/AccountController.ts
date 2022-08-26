import {IAccountController} from "./IAccountController";
import {_CreateAccount} from "../use-cases/_CreateAccount";
import {DatabaseService, IdService} from "../../../config/dependencies";
import {IAccountRepository} from "../domain/interfaces/IAccountRepository";
import {IId} from "../../../interfaces/IId";
import {_UpdateAccount, UpdateAccountProps} from "../use-cases/_UpdateAccount";
import {_DeleteAccount} from "../use-cases/_DeleteAccount";
import {_GetAccountById} from "../use-cases/_GetAccountById";

interface CreateProps {
    name: string,
}



export class AccountController implements IAccountController {
    AccountRepository: IAccountRepository
    Id: IId

    constructor() {
        this.AccountRepository = DatabaseService && DatabaseService.accountRepository
        this.Id = IdService
    }

    async create({name}: CreateProps) {
        return await _CreateAccount(
            {Id: this.Id, AccountRepository: this.AccountRepository}
        ).Execute({name})


    }

    async update(props: UpdateAccountProps) {
        return await _UpdateAccount(
            {AccountRepository: this.AccountRepository}
        ).Execute(props)


    }

    async delete( id: string) {
        return await _DeleteAccount(
            {AccountRepository: this.AccountRepository}
        ).Execute({id})
    }

    async getOne( id: string) {
        return await _GetAccountById(
            {AccountRepository: this.AccountRepository}
        ).Execute({id})
    }

}