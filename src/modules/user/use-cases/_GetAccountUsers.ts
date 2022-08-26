import {BadRequestError} from "../../../lib/errors";
import {IUserRepository} from "../domain/interfaces/IUserRepository";
import {UserPresenter} from "../presenters/UserPresenter";

interface Props {
    UserRepository: IUserRepository
}

export function _GetAccountUsers({UserRepository}: Props) {

    async function Execute(accountId: string) {
         return await UserRepository.getAccountUsers(accountId)
    }

    return {
        Execute
    };
};