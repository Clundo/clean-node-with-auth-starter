import {BadRequestError} from "../../../lib/errors";
import {IUserRepository} from "../domain/interfaces/IUserRepository";
import {UserPresenter} from "../presenters/UserPresenter";

interface Props {
    UserRepository: IUserRepository
}

export function _GetUserByAuthId({UserRepository}: Props) {

    async function Execute({authId}: { authId: string }) {
        if (!authId) throw new BadRequestError('Auth Id is required')
        return await UserRepository.getOneByAuthId(authId)
    }

    return {
        Execute
    };
};