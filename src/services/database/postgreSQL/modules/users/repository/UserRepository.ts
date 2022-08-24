import {DatabaseService} from "../../../../../../config/dependencies";
import {IUserEntity} from "../../../../../../modules/user/domain/interfaces/IUserEntity";
import {DatabaseError} from "../../../../../../lib/errors";
import {UserEntity} from "../../../../../../modules/user/domain/entities/userEntity";
import {IUserRepository} from "../../../../../../modules/user/domain/interfaces/IUserRepository";
import prisma from '../../../prisma'

export class UserRepository implements IUserRepository {
    prisma
    constructor() {
    this.prisma = prisma
        console.log('user repo created')
    }

    async create(userInstance: IUserEntity) {
        try {
            //Need to extract fields due to underscore in entity, or nothing is saved
            const {
                id,
                firstName,
                lastName,
                email,
                authId,
                modifiedAt,
                createdAt
            } = userInstance
            const user = await this.prisma.user.create({
                data: {
                    id,
                    firstName,
                    lastName,
                    email,
                    authId,
                    modifiedAt,
                    createdAt
                }
            })
            return new UserEntity(user)

        } catch (err) {
            throw err
        }
    }

    async update(userInstance: IUserEntity) {
        try {

            //Need to extract props, or this is not updated due to underscore
            const {
                id,
                firstName,
                lastName,
                email,
                modifiedAt
            } = userInstance
            const user = await this.prisma.user.update({
                where: {id},
                data: {
                firstName,
                lastName,
                email,
                modifiedAt
            }})

            if(!user) throw new DatabaseError()

            return new UserEntity(user)
        } catch (err) {
            throw err
        }
    }

    async delete(userId: string) {
        try {
            return await this.prisma.user.delete({
            where: {id: userId}
            })

        } catch (err) {
            throw err
        }
    }



    async getOneById(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({where: {id: userId}})
            if (!user) return null
            console.log(user)
            return new UserEntity(user)

        } catch (err) {
            throw err
        }
    }

    async getOneByEmail(email: string) {

        try {
            const user = await this.prisma.user.findUnique({where: {email}})
            if (!user) return null
            return new UserEntity(user)

        } catch (err) {
            throw err
        }
    }

}