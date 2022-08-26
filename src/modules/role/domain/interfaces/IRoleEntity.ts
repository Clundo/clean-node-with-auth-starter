import {IBaseEntity} from "../../../../interfaces/IBaseEntity";
import {EPermissionSections} from "../../../../interfaces/EPermissionSections";

export interface IPermission {
    section: EPermissionSections
    canRead: boolean
    canWrite: boolean
    canDelete: boolean
}

export interface IRoleEntity extends IBaseEntity {
    accountId: string
    name: string
    permissions: IPermission[]

    editPermission(props: IPermission) : void
}