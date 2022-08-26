import {BadRequestError} from "../../../lib/errors";
import {IRoleRepository} from "../domain/interfaces/IRoleRepository";


interface Props {
    RoleRepository: IRoleRepository
}

export function _GetAccountRoles({RoleRepository}: Props) {

    async function Execute({accountId}: { accountId: string }) {
        if (!accountId) throw new BadRequestError('Account Id is required')
        return await RoleRepository.getManyByAccountId(accountId)
    }

    return {
        Execute
    };
};