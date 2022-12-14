import {BadRequestError} from "../lib/errors";
import {IBaseEntity} from "../interfaces/IBaseEntity";

interface Props {
    id: string
    createdAt?: Date
    modifiedAt?: Date
}

export abstract class BaseEntity implements IBaseEntity{
    protected constructor({id, createdAt, modifiedAt}: Props) {
        if (!id) throw new BadRequestError('ID is missing')
        this._id = id
        this._createdAt = createdAt ?? new Date()
        this._modifiedAt = modifiedAt ?? new Date()

    }

    protected _id: string

    get id() {
        return this._id
    }

    private _createdAt: Date

    get createdAt() {
        return this._createdAt
    }

    protected _modifiedAt: Date

    get modifiedAt() {
        return this._modifiedAt
    }

    modifyNow() {
        this._modifiedAt = new Date()
    }
}
