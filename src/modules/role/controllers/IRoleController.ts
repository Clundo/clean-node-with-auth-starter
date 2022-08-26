import {IPermission, IRoleEntity} from "../domain/interfaces/IRoleEntity";

interface UpdatePermissionProps extends IPermission {
    roleId: string
}

export interface IRoleController {
    create: (props: { accountId: string, name: string, permissions: IPermission[] }) => Promise<IRoleEntity>

    update: (props: { name: string, id: string }) => Promise<IRoleEntity>

    updatePermission: (props: UpdatePermissionProps) => Promise<IRoleEntity>

    delete: (id: string) => Promise<any>

    getOne: (id: string) => Promise<IRoleEntity | null>

    getMany: (accountId: string) => Promise<IRoleEntity[]>

}