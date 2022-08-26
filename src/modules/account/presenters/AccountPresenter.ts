import {DatabaseService, IdService} from "../../../config/dependencies";
import {IAccountRepository} from "../domain/interfaces/IAccountRepository";
import {IId} from "../../../interfaces/IId";
import {_GetAccountById} from "../use-cases/_GetAccountById";
import {IAccountPresenter} from "./IAccountPresenter";


export class AccountPresenter implements IAccountPresenter {
    AccountRepository: IAccountRepository
    Id: IId

    constructor() {
        this.AccountRepository = DatabaseService?.accountRepository
        this.Id = IdService
    }

    async getOne(id: string) {
        const account = await _GetAccountById(
            {AccountRepository: this.AccountRepository}
        ).Execute({id})

        return account?.getPublicEntity() ?? null
    }

}