import {BadRequestError} from "../../../lib/errors";
import {IAccountRepository} from "../domain/interfaces/IAccountRepository";

interface Props {
    AccountRepository: IAccountRepository
}

export function _DeleteAccount({AccountRepository}: Props) {

    async function Execute({id}: { id: string }) {
        if (!id) throw new BadRequestError('Id is required')
        return await AccountRepository.delete(id)
    }

    return {
        Execute
    };
};