import {BadRequestError, NotFoundError, ServerError} from "../../../lib/errors";
import {IRoleRepository} from "../domain/interfaces/IRoleRepository";
import {EPermissionSections} from "../../../interfaces/EPermissionSections";
import {IPermission} from "../domain/interfaces/IRoleEntity";

interface Props {
    RoleRepository: IRoleRepository
}

interface UpdatePermissionProps extends IPermission{
    roleId: string
}

export function _UpdatePermission ({RoleRepository}: Props)  {

    async function Execute(props: UpdatePermissionProps) {

        if (!props.roleId) throw new BadRequestError('ID is required')
        const role = await RoleRepository.getOneById(props.roleId)
        if (!role) throw new NotFoundError('Role not found')

        role.editPermission(props)

        return await RoleRepository.update(role)
    }

    return {
        Execute
    };
};