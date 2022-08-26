import {IRoleController} from "./IRoleController";
import {IRoleRepository} from "../domain/interfaces/IRoleRepository";
import {IId} from "../../../interfaces/IId";
import {DatabaseService, IdService} from "../../../config/dependencies";
import {_CreateRole} from "../use-cases/_CreateRole";
import {_UpdateRole} from "../use-cases/_UpdateRole";
import {_DeleteRole} from "../use-cases/_DeleteRole";
import {_GetRoleById} from "../use-cases/_GetRoleById";
import {IPermission} from "../domain/interfaces/IRoleEntity";
import {_GetAccountRoles} from "../use-cases/_GetAccountRoles";
import {_UpdatePermission} from "../use-cases/_UpdatePermission";

interface CreateProps {
    name: string,
    accountId: string,
    permissions: IPermission[]
}

interface UpdateProps {
    name: string,
    id: string
}

interface UpdatePermissionProps extends IPermission {
    roleId: string
}

export class RoleController implements IRoleController {
    RoleRepository: IRoleRepository
    Id: IId

    constructor() {
        this.RoleRepository = DatabaseService && DatabaseService.roleRepository
        this.Id = IdService
    }

    async create({name, accountId, permissions}: CreateProps) {
        return await _CreateRole(
            {Id: this.Id, RoleRepository: this.RoleRepository}
        ).Execute({name, accountId, permissions})
    }

    async update({name, id}: UpdateProps) {
        return await _UpdateRole(
            {RoleRepository: this.RoleRepository}
        ).Execute({name, id})
    }

    async updatePermission(props: UpdatePermissionProps) {
        return await _UpdatePermission(
            {RoleRepository: this.RoleRepository}
        ).Execute(props)
    }

    async delete(id: string) {
        return await _DeleteRole(
            {RoleRepository: this.RoleRepository}
        ).Execute({id})
    }

    async getOne(id: string) {
        return await _GetRoleById(
            {RoleRepository: this.RoleRepository}
        ).Execute({id})
    }

    async getMany(accountId: string) {
        return await _GetAccountRoles(
            {RoleRepository: this.RoleRepository}
        ).Execute({accountId})
    }

}