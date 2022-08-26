import {IAccountEntity} from "../../../../../../modules/account/domain/interfaces/IAccountEntity";
import {BadRequestError, DatabaseError} from "../../../../../../lib/errors";
import {AccountEntity} from "../../../../../../modules/account/domain/entities/accountEntity";
import {IAccountRepository} from "../../../../../../modules/account/domain/interfaces/IAccountRepository";
import prisma from '../../../prisma'

export class AccountRepository implements IAccountRepository {
    prisma

    constructor() {
        this.prisma = prisma
        console.log('account repo created')
    }

    async create(accountInstance: IAccountEntity) {
        try {
            const {
                id,
                modifiedAt,
                createdAt,
                name,
                addressLine1,
                addressLine2,
                postCode,
                city,
                state,
                country,
                phone,
                email
            } = accountInstance

            const account = await this.prisma.account.create({
                data: {
                    id,
                    modifiedAt,
                    createdAt,
                    name,
                    addressLine1,
                    addressLine2,
                    postCode,
                    city,
                    state,
                    country,
                    phone,
                    email
                }
            })
            return new AccountEntity(account)

        } catch (err) {
            throw err
        }
    }

    async update(accountInstance: IAccountEntity) {
        try {
            const {
                id,
                modifiedAt,
                createdAt,
                name,
                addressLine1,
                addressLine2,
                postCode,
                city,
                state,
                country,
                phone,
                email
            } = accountInstance
            const account = await this.prisma.account.update({
                where: {id},
                data: {
                    id,
                    modifiedAt,
                    createdAt,
                    name,
                    addressLine1,
                    addressLine2,
                    postCode,
                    city,
                    state,
                    country,
                    phone,
                    email
                }
            })

            if (!account) throw new DatabaseError()

            return new AccountEntity(account)
        } catch (err) {
            throw err
        }
    }

    async delete(accountId: string) {
        try {
            return await this.prisma.account.delete({
                where: {id: accountId}
            })

        } catch (err) {
            throw err
        }
    }


    async getOneById(accountId: string) {
        try {
            const account = await this.prisma.account.findUnique({where: {id: accountId}})
            if (!account) return null
            return new AccountEntity(account)

        } catch (err) {
            throw err
        }
    }



}