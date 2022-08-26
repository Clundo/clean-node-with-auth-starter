import {BadRequestError, NotFoundError} from "../../../lib/errors";
import {IUserRepository} from "../domain/interfaces/IUserRepository";

interface Props {
    UserRepository: IUserRepository
}

interface UpdateUserProps {
    id: string
    firstName?: string
    lastName?: string
    roleId?: string
}

export function _UpdateUser({UserRepository}: Props) {

    async function Execute({id, firstName, lastName, roleId}: UpdateUserProps) {

        if (!id) throw new BadRequestError('ID is required')
        const user = await UserRepository.getOneById(id)
        if (!user) throw new NotFoundError('User not found')

        if (firstName) user.firstName = firstName
        if (lastName) user.lastName = lastName
        if (roleId) user.roleId = roleId

        return await UserRepository.update(user)
    }

    return {
        Execute
    };
};