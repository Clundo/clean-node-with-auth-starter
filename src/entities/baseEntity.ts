import {BadRequestError} from "../lib/errors";

interface Props {
    id: string
    createdAt?: number
    modifiedAt?: number
}

export abstract class BaseEntity {
    protected constructor({id, createdAt, modifiedAt}: Props) {
        console.log(id)
        if (!id) throw new BadRequestError('ID is missing')
        this._id = id
        this._createdAt = createdAt ?? Date.now()
        this._modifiedAt = modifiedAt ?? Date.now()

        console.log(Date.now())
        console.log(this._createdAt)
    }

    protected _id: string

    get id() {
        return this._id
    }

    private _createdAt: number

    get createdAt() {
        return this._createdAt
    }

    protected _modifiedAt: number

    get modifiedAt() {
        return this._modifiedAt
    }

    modifyNow() {
        this._modifiedAt = Date.now()
    }
}
