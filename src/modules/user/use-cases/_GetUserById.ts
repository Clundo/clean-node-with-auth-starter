import {BadRequestError} from "../../../lib/errors";
import {IUserRepository} from "../domain/interfaces/IUserRepository";
import {UserPresenter} from "../presenters/UserPresenter";

interface Props {
    UserRepository: IUserRepository
}

export function _GetUserById({UserRepository}: Props) {

    console.log(UserRepository)
    async function Execute({id}: { id: string }) {
        if (!id) throw new BadRequestError('Id is required')
        return await UserRepository.getOneById(id)
    }

    return {
        Execute
    };
};