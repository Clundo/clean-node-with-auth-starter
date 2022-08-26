import {IUserRepository} from "../domain/interfaces/IUserRepository";
import {IId} from "../../../interfaces/IId";
import {UserEntity} from "../domain/entities/userEntity";
import {BadRequestError, ServerError} from "../../../lib/errors";


interface Props {
    Id: IId,
    UserRepository: IUserRepository
}

interface ExecProps {
    firstName: string
    lastName: string
    email: string
    authId: string
    accountId: string
    roleId: string
}

export function _CreateUser({Id, UserRepository}: Props) {

    async function Execute(props: ExecProps) {
        const id = await Id.makeId()
        if (!props.email) throw new BadRequestError('Email is required')
        const existingUser = await UserRepository.getOneByEmail(props.email)
        if (existingUser) throw new ServerError('User already exists')
        const newUser = new UserEntity({id, ...props})
        return await UserRepository.create(newUser)

    }

    return {
        Execute
    };
}