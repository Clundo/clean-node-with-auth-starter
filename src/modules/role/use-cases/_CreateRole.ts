import {IRoleRepository} from "../domain/interfaces/IRoleRepository";
import {IId} from "../../../interfaces/IId";
import {RoleEntity} from "../domain/entities/roleEntity";
import {BadRequestError, ServerError} from "../../../lib/errors";
import {IPermission} from "../domain/interfaces/IRoleEntity";


interface Props {
    Id: IId,
    RoleRepository: IRoleRepository
}

interface ExecProps {
    accountId: string
    name: string
    permissions: IPermission[]
}

export function _CreateRole({Id, RoleRepository}: Props) {

    async function Execute(props: ExecProps) {
        const id = await Id.makeId()
        if (!props.accountId) throw new BadRequestError('Account ID is required')
        if (!props.name) throw new BadRequestError('Name is required')
        if (!props.permissions) throw new BadRequestError('Permissions is required')
        const existingRole = await RoleRepository.getOneByNameAndAccountId(props.name, props.accountId)
        if (existingRole) throw new ServerError('Role already exists')
        const newRole = new RoleEntity({id, ...props})
        return await RoleRepository.create(newRole)

    }

    return {
        Execute
    };
}