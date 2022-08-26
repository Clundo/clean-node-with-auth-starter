import {IId} from "../../../interfaces/IId";
import {BadRequestError} from "../../../lib/errors";
import {AccountEntity} from "../domain/entities/accountEntity";
import {IAccountRepository} from "../domain/interfaces/IAccountRepository";


interface Props {
    Id: IId,
    AccountRepository: IAccountRepository
}

interface ExecProps {
    name: string
}

export function _CreateAccount ({Id, AccountRepository}: Props) {

    async function Execute({name}: ExecProps) {
        const id = await Id.makeId()
        if(!name) throw new BadRequestError('Name is required')
        const newAccount = new AccountEntity({id, name})
        return await AccountRepository.create(newAccount)

    }

    return {
        Execute
    };
}