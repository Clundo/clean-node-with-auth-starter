import {BaseEntity} from "../../../../entities/baseEntity";
import {IPermission, IRoleEntity} from "../interfaces/IRoleEntity";
import {BadRequestError} from "../../../../lib/errors";

interface Props {
    id: string
    createdAt?: Date
    modifiedAt?: Date
    accountId: string
    name: string
    permissions: IPermission[]
}

export class RoleEntity extends BaseEntity implements IRoleEntity {
    constructor({
                    id,
                    createdAt,
                    modifiedAt,
                    accountId,
                    name,
                    permissions
                }: Props) {
        super({id, createdAt, modifiedAt})
        if (!accountId) throw new BadRequestError('Account ID is required')
        if (!name) throw new BadRequestError('Name is required')
        if (!permissions) throw new BadRequestError('Permissions is required')
        this._accountId = accountId
        this._name = name
        this._permissions = permissions
    }

    _accountId: string
    get accountId() {
        return this._accountId
    }

    _name: string
    get name() {
        return this._name
    }

    set name(newVal) {
        this._name = newVal
        this.modifyNow()
    }

    _permissions: IPermission[]
    get permissions() {
        return this._permissions
    }

    editPermission({section, canRead, canWrite, canDelete}: IPermission) {
        if (!section) throw new BadRequestError('Section is required')
        if (!canRead || !canWrite || !canDelete) throw new BadRequestError('All permissions is required')

        this._permissions = this._permissions.map(p => p.section === section ? {
            section,
            canRead,
            canWrite,
            canDelete
        } : p)
        this.modifyNow()
    }
}