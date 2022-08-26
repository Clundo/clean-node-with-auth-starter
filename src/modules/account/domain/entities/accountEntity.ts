import {IUserEntity} from "../../../user/domain/interfaces/IUserEntity";
import {IAccountEntity} from "../interfaces/IAccountEntity";
import {IRole} from "../../../../interfaces/IRole";
import {BaseEntity} from "../../../../entities/baseEntity";
import {BadRequestError} from "../../../../lib/errors";

interface Props {
    id: string
    createdAt?: Date
    modifiedAt?: Date
    name: string
    vatNumber: string
    addressLine1?: string
    addressLine2?: string
    postCode?: string
    city?: string
    state?: string
    country?: string
    phone?: string
    email?: string
}

export class AccountEntity extends BaseEntity implements IAccountEntity {
    _name: string
    _vatNumber: string
    _addressLine1: string
    _addressLine2: string
    _postCode: string
    _city: string
    _state: string
    _country: string
    _phone: string
    _email: string


    constructor({
                    id,
                    createdAt,
                    modifiedAt,
                    name,
        vatNumber,
                    addressLine1,
                    addressLine2,
                    phone,
                    postCode,
                    email,
                    country,
                    city,
                    state
                }: Props) {
        super({id, createdAt, modifiedAt})
        if(!name) throw new BadRequestError('Name is required')
        this._name = name
        this._vatNumber = vatNumber
        this._addressLine1 = addressLine1 ?? ''
        this._addressLine2 = addressLine2 ?? ''
        this._postCode = postCode ?? ''
        this._city = city ?? ''
        this._state = state ?? ''
        this._country = country ?? ''
        this._phone = phone ?? ''
        this._email = email ?? ''
    }

    get name() {
        return this._name
    }

    set name(newVal: string) {
        this._name = newVal
        this.modifyNow()
    }

    get vatNumber() {
        return this._vatNumber
    }

    set vatNumber(newVal: string) {
        this._vatNumber = newVal
        this.modifyNow()
    }

    get addressLine1() {
        return this._addressLine1
    }

    set addressLine1(newVal: string) {
        this._addressLine1 = newVal
        this.modifyNow()
    }
    get addressLine2() {
        return this._addressLine2
    }

    set addressLine2(newVal: string) {
        this._addressLine2 = newVal
        this.modifyNow()
    }
    get postCode() {
        return this._postCode
    }

    set postCode(newVal: string) {
        this._postCode = newVal
        this.modifyNow()
    }
    get city() {
        return this._city
    }

    set city(newVal: string) {
        this._city = newVal
        this.modifyNow()
    }
    get state() {
        return this._state
    }

    set state(newVal: string) {
        this._state = newVal
        this.modifyNow()
    }
    get country() {
        return this._country
    }

    set country(newVal: string) {
        this._country = newVal
        this.modifyNow()
    }

    get phone() {
        return this._phone
    }

    set phone(newVal: string) {
        this._phone = newVal
        this.modifyNow()
    }

    get email() {
        return this._email
    }

    set email(newVal: string) {
        this._email = newVal
        this.modifyNow()
    }

    getPublicEntity() {
        return {
            id: this._id,
            name: this._name,
            country: this._country
        }
    }
}