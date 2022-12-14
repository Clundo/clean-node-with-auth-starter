import {BaseEntity} from "../../../../entities/baseEntity";
import {IUserEntity} from "../interfaces/IUserEntity";
import {BadRequestError} from "../../../../lib/errors";

interface Props {
    id: string
    firstName: string
    lastName: string
    email: string
    authId: string
    createdAt?: Date
    modifiedAt?: Date
    accountId: string
    roleId: string
}


export class UserEntity extends BaseEntity implements IUserEntity {

    constructor({
                    id,
                    firstName,
                    lastName,
                    email,
                    authId,
                    createdAt,
                    modifiedAt,
                    accountId,
                    roleId
                }: Props) {
        super({id, createdAt, modifiedAt})
        if (!firstName) throw new BadRequestError('First Name is required')
        if (!lastName) throw new BadRequestError('Last Name is required')
        if (!email) throw new BadRequestError('Email is required')
        if (!authId) throw new BadRequestError('Auth ID is required')
        if (!accountId) throw new BadRequestError('Account ID is required')
        if (!roleId) throw new BadRequestError('Role ID is required')
        this._firstName = firstName
        this._lastName = lastName
        this._email = email
        this._authId = authId
        this._accountId = accountId
        this._roleId = roleId
    }

    private _firstName: string

    get firstName() {
        return this._firstName
    }

    set firstName(newFirstName) {
        if(!newFirstName) throw new BadRequestError('First Name is required')
        this._firstName = newFirstName
        this.modifyNow()
    }

    private _lastName: string

    get lastName() {
        return this._lastName
    }

    set lastName(newLastName) {
        if(!newLastName) throw new BadRequestError('Last Name is required')
        this._lastName = newLastName
        this.modifyNow()
    }

    private readonly _email: string

    get email() {
        return this._email
    }

    private readonly _authId: string

    get authId() {
        return this._authId
    }

    _accountId: string
    get accountId () {
        return this._accountId
    }

    _roleId: string
    get roleId () {
        return this._roleId
    }


    getPublicEntity() {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email
        }
    }
}

