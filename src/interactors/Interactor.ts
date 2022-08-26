import {IInteractor} from "./IInteractor";
import {IPermission, IRoleEntity} from "../modules/role/domain/interfaces/IRoleEntity";
import {UserPresenter} from "../modules/user/presenters/UserPresenter";
import {UserController} from "../modules/user/controllers/UserController";
import {AccountController} from "../modules/account/controllers/AccountController";
import {AccountPresenter} from "../modules/account/presenters/AccountPresenter";
import {RoleController} from "../modules/role/controllers/RoleController";
import {EPermissionSections} from "../interfaces/EPermissionSections";
import {BadRequestError, NotFoundError, ServerError, UnauthorizedError} from "../lib/errors";
import {UpdateAccountProps} from "../modules/account/use-cases/_UpdateAccount";
import {AuthService} from "../config/dependencies";
import userRouter from "../services/app/express/routes/userRoutes";

interface IUpdateAccountProps extends UpdateAccountProps {
    userRole: IRoleEntity
}

export class Interactor implements IInteractor {
    userController: UserController
    userPresenter: UserPresenter
    accountController: AccountController
    accountPresenter: AccountPresenter
    roleController: RoleController

    constructor() {
        this.userController = new UserController()
        this.userPresenter = new UserPresenter()
        this.accountController = new AccountController()
        this.accountPresenter = new AccountPresenter()
        this.roleController = new RoleController()
    }

    async signUp({
                     firstName,
                     lastName,
                     email,
                     authId
                 }: { firstName: string, lastName: string, email: string, authId: string }) {
        try {
            const existing = await this.userController.getOneByEmail(email)
            if (existing) throw new BadRequestError('Email already in use')

            const account = await this.accountController.create({name: `${firstName} ${lastName}`})
            const ownerRole = await this.roleController.create({
                name: 'Owner', accountId: account.id, permissions: [{
                    section: EPermissionSections.ROLE,
                    canRead: true,
                    canWrite: true,
                    canDelete: true
                }, {
                    section: EPermissionSections.USERS,
                    canRead: true,
                    canWrite: true,
                    canDelete: true
                }, {
                    section: EPermissionSections.ACCOUNT,
                    canRead: true,
                    canWrite: true,
                    canDelete: true
                }]
            })
            const adminRole = await this.roleController.create({
                name: 'Admin', accountId: account.id, permissions: [{
                    section: EPermissionSections.ROLE,
                    canRead: false,
                    canWrite: false,
                    canDelete: false
                }, {
                    section: EPermissionSections.USERS,
                    canRead: true,
                    canWrite: true,
                    canDelete: false
                }, {
                    section: EPermissionSections.ACCOUNT,
                    canRead: true,
                    canWrite: true,
                    canDelete: false
                }]
            })
            const userRole = await this.roleController.create({
                name: 'User', accountId: account.id, permissions: [{
                    section: EPermissionSections.ROLE,
                    canRead: false,
                    canWrite: false,
                    canDelete: false
                }, {
                    section: EPermissionSections.USERS,
                    canRead: true,
                    canWrite: false,
                    canDelete: false
                }, {
                    section: EPermissionSections.ACCOUNT,
                    canRead: true,
                    canWrite: false,
                    canDelete: false
                }]
            })
            const user = await this.userController.create({
                firstName,
                lastName,
                email,
                authId,
                accountId: account.id,
                roleId: ownerRole.id
            })

            return await this.userPresenter.getOne(user.id)

        } catch (e) {
            throw e
        }
    }

    async getUser({id, userRole} : { id: string, userRole: IRoleEntity }) {
        try {

            return await this.userPresenter.getOne(id)
        } catch (e) {
            throw e
        }
    }


    async getUsers({userRole}: { userRole: IRoleEntity }) {
        try {
            const userPermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.USERS)
            if (!userPermissions || !userPermissions.canRead) throw new UnauthorizedError()
            return await this.userPresenter.getMany(userRole.accountId)
        } catch (e) {
            throw e
        }
    }

    async createUser({
                         userRole,
                         firstName,
                         lastName,
                         password,
                         email,
                         roleId
                     }: { userRole: IRoleEntity, firstName: string, lastName: string, email: string, password: string, roleId: string }) {

        try {
            const userPermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.USERS)
            if (!userPermissions || !userPermissions.canWrite) throw new UnauthorizedError()
            const existing = await this.userController.getOneByEmail(email)
            if(existing) throw new ServerError('Email already in use')
            const authId = await AuthService.createUser({email, password})
            const user = await this.userController.create({
                firstName,
                lastName,
                email,
                authId,
                roleId,
                accountId: userRole.accountId
            })
            return await this.userPresenter.getOne(user.id)

        } catch (e) {
            throw e
        }

    }

    async updateUser({
                         userRole,
                         firstName,
                         lastName,
                         roleId,
                         id
                     }: { userRole: IRoleEntity, firstName?: string, lastName?: string, roleId?: string, id: string }) {
        try {
            const userPermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.USERS)
            if (!userPermissions || !userPermissions.canWrite) throw new UnauthorizedError()

            const user = await this.userController.getOne(id)
            if(!user) throw new NotFoundError()

            if(user.accountId !== userRole.accountId) throw new UnauthorizedError()

            if(roleId) {
                const rolePermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ROLE)
                if (!rolePermissions || !rolePermissions.canWrite) throw new UnauthorizedError()
            }
            await this.userController.update({firstName, lastName, id})
            return await this.userPresenter.getOne(id)
        } catch (e) {
            throw e
        }
    }

    async deleteUser({id, userRole}: { id: string, userRole: IRoleEntity }) {
        try {
            const userPermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.USERS)
            if (!userPermissions || userPermissions.canDelete) throw new UnauthorizedError()
            const user = await this.userController.getOne(id)
            if(!user) throw new NotFoundError()
            if(user.accountId !== userRole.accountId) throw new UnauthorizedError()
            return await this.userController.delete(id)
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async getAccount({userRole}: { userRole: IRoleEntity }) {
        try {
            const accountPermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ACCOUNT)
            if (!accountPermissions || accountPermissions.canRead) throw new UnauthorizedError()
            return await this.accountPresenter.getOne(userRole.accountId)
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async updateAccount({userRole, ...props}: IUpdateAccountProps) {

        try {
            const accountPermissions = userRole.permissions.find((permission: IPermission) => permission.section === EPermissionSections.ACCOUNT)
            if (!accountPermissions || !accountPermissions.canWrite || userRole.accountId !== props.id) throw new UnauthorizedError()
            if(props.id !== userRole.accountId) throw new UnauthorizedError()
            await this.accountController.update(props)
            return await this.accountPresenter.getOne(props.id)
        } catch (e) {
            throw e
        }
    }

    async getUserRole(authId: string) {
        try {
            //no access checks as this is only used for middleware
            const user = await this.userController.getOneByAuthId(authId)
            if (!user) return null
            return await this.roleController.getOne(user.roleId)
        } catch (e) {
            throw e
        }
    }

    async getRoles({userRole}: { userRole: IRoleEntity }) {
        try {
            const rolePermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ROLE)
            if (!rolePermissions || !rolePermissions.canRead) throw new UnauthorizedError()
            return await this.roleController.getMany(userRole.accountId)
        } catch (e) {
            throw e
        }
    }

    async createRole({userRole, newRole}: {
        userRole: IRoleEntity, newRole: {
            name: string
            permissions: IPermission[]
        }
    }) {
        try {
            const rolePermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ROLE)
            if (!rolePermissions || !rolePermissions.canWrite) throw new UnauthorizedError()
            return await this.roleController.create({accountId: userRole.accountId, ...newRole})
        } catch (e) {
            throw e
        }
    }

    async updateRole({userRole, roleToUpdate}: { userRole: IRoleEntity, roleToUpdate: IRoleEntity }) {
        try {
            const rolePermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ROLE)
            if (!rolePermissions || !rolePermissions.canWrite || userRole.accountId !== roleToUpdate.accountId) throw new UnauthorizedError()

            return await this.roleController.update(roleToUpdate)
        } catch (e) {
            throw e
        }
    }

    async updatePermission({
                               userRole,
                               roleId,
                               permission
                           }: { userRole: IRoleEntity, roleId: string, permission: IPermission }) {
        try {
            const role = await this.roleController.getOne(roleId)
            if(!role) throw new NotFoundError()
            const rolePermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ROLE)
            if (!rolePermissions || !rolePermissions.canWrite || userRole.accountId !== role.accountId) throw new UnauthorizedError()
            return await this.roleController.updatePermission({roleId, ...permission})
        } catch (e) {
            throw e
        }
    }

    async deleteRole({userRole, roleId}: { userRole: IRoleEntity, roleId: string }) {
        try {
            const userPermissions = userRole.permissions.find(permission => permission.section === EPermissionSections.ROLE)
            const role = await this.roleController.getOne(roleId)
            if (!role) throw new ServerError('Role not found')
            if (!userPermissions || !userPermissions.canDelete || userRole.accountId !== role.accountId) throw new UnauthorizedError()
            return await this.roleController.delete(roleId)
        } catch (e) {
            throw e
        }
    }


}