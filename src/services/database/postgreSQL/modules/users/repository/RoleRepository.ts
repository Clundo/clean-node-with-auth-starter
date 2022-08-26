import {IRoleEntity} from "../../../../../../modules/role/domain/interfaces/IRoleEntity";
import {BadRequestError, DatabaseError} from "../../../../../../lib/errors";
import {RoleEntity} from "../../../../../../modules/role/domain/entities/roleEntity";
import {IRoleRepository} from "../../../../../../modules/role/domain/interfaces/IRoleRepository";
import prisma from '../../../prisma'

export class RoleRepository implements IRoleRepository {
    prisma

    constructor() {
        this.prisma = prisma
        console.log('role repo created')
    }

    async create(roleInstance: IRoleEntity) {
        try {
            const {
                id,
                modifiedAt,
                createdAt,
                accountId,
                name,
                permissions
            } = roleInstance
            const stringifiedPermissions = JSON.stringify(permissions)

            const existingRole = await this.prisma.role.findFirst({where: {name, accountId}})

            if (existingRole) throw new BadRequestError('Role already exists')

            const role = await this.prisma.role.create({
                data: {
                    id,
                    modifiedAt,
                    createdAt,
                    accountId,
                    name,
                    permissions: stringifiedPermissions
                }
            })
            const returnRole = {...role, permissions: JSON.parse(role.permissions)}
            return new RoleEntity(returnRole)

        } catch (err) {
            throw err
        }
    }

    async update(roleInstance: IRoleEntity) {
        try {

            //Need to extract props, or this is not updated due to underscore
            const {
                id,
                modifiedAt,
                accountId,
                name,
                permissions
            } = roleInstance
            const stringifiedPermissions = JSON.stringify(permissions)
            const role = await this.prisma.role.update({
                where: {id},
                data: {
                    modifiedAt,
                    accountId,
                    name,
                    permissions: stringifiedPermissions
                }
            })

            if (!role) throw new DatabaseError()

            const returnRole = {...role, permissions: JSON.parse(role.permissions)}
            return new RoleEntity(returnRole)
        } catch (err) {
            throw err
        }
    }

    async delete(roleId: string) {
        try {
            return await this.prisma.role.delete({
                where: {id: roleId}
            })

        } catch (err) {
            throw err
        }
    }


    async getOneById(roleId: string) {
        try {
            const role = await this.prisma.role.findUnique({where: {id: roleId}})
            if (!role) return null
            const returnRole = {...role, permissions: JSON.parse(role.permissions)}
            return new RoleEntity(returnRole)

        } catch (err) {
            throw err
        }
    }

    async getOneByNameAndAccountId(name: string, accountId: string) {
        try {
            const role = await this.prisma.role.findFirst({where: {name, accountId}})
            if (!role) return null
            const returnRole = {...role, permissions: JSON.parse(role.permissions)}
            return new RoleEntity(returnRole)

        } catch (err) {
            throw err
        }
    }

    async getManyByAccountId(accountId: string) {
        try {
            const roles = await this.prisma.role.findMany({where: {accountId}})
            return roles.map(role => new RoleEntity({...role, permissions: JSON.parse(role.permissions)}))

        } catch (err) {
            throw err
        }
    }

}