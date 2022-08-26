import {BadRequestError, NotFoundError, ServerError} from "../../../lib/errors";
import {IRoleRepository} from "../domain/interfaces/IRoleRepository";

interface Props {
    RoleRepository: IRoleRepository
}

interface UpdateRoleProps {
    id: string
    name?: string
}

export function _UpdateRole ({RoleRepository}: Props)  {

    async function Execute({id, name}: UpdateRoleProps) {

        if (!id) throw new BadRequestError('ID is required')
        const role = await RoleRepository.getOneById(id)
        if (!role) throw new NotFoundError('Role not found')

        if (name) role.name = name

        return await RoleRepository.update(role)
    }

    return {
        Execute
    };
};