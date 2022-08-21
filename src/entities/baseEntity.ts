import {BadRequestError} from "../lib/errors";

interface Props {
    id: string
    createdOn?: number
    modifiedOn?: number
}

export abstract class BaseEntity {
    protected constructor({id, createdOn, modifiedOn}: Props) {

        if (!id) throw new BadRequestError('ID is missing')
        this._id = id
        this._createdOn = createdOn ?? Date.now()
        this._modifiedOn = modifiedOn ?? Date.now()
    }

    protected _id: string

    get id() {
        return this._id
    }

    private _createdOn: number

    get createdOn() {
        return this._createdOn
    }

    protected _modifiedOn: number

    get modifiedOn() {
        return this._modifiedOn
    }

    modifyNow() {
        this._modifiedOn = Date.now()
    }
}
