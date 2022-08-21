import {BadRequestError} from "../../../lib/errors";
import {IUserRepository} from "../domain/interfaces/IUserRepository";

interface Props {
    UserRepository: IUserRepository
}

export function _GetUserByEmail({UserRepository}: Props) {

    async function Execute({email}: { email: string }) {
        if (!email) throw new BadRequestError('Email is required')
        return await UserRepository.getOneByEmail(email)
    }

    return {
        Execute
    };
};