import {BadRequestError} from "../../../lib/errors";
import {IRoleRepository} from "../domain/interfaces/IRoleRepository";


interface Props {
    RoleRepository: IRoleRepository
}

export function _GetRoleById({RoleRepository}: Props) {

    async function Execute({id}: { id: string }) {
        if (!id) throw new BadRequestError('Id is required')
        return await RoleRepository.getOneById(id)
    }

    return {
        Execute
    };
};