import {IUserPublicEntity} from "../modules/user/domain/interfaces/IUserPublicEntity";
import {IAccountPublicEntity} from "../modules/account/domain/interfaces/IAccountPublicEntity";
import {UpdateAccountProps} from "../modules/account/use-cases/_UpdateAccount";
import {IPermission, IRoleEntity} from "../modules/role/domain/interfaces/IRoleEntity";
import {IUserEntity} from "../modules/user/domain/interfaces/IUserEntity";

interface IUpdateAccountProps extends UpdateAccountProps {
    userRole: IRoleEntity
}

export interface IInteractor {

    signUp(props: { firstName: string, lastName: string, email: string }): Promise<IUserPublicEntity | null>

    getUser(props: {id: string, userRole: IRoleEntity}): Promise<IUserPublicEntity | null>

    getUsers(props: {userRole: IRoleEntity}): Promise<IUserPublicEntity[]>

    createUser(props: { userRole: IRoleEntity, firstName: string, lastName: string, email: string, password: string, roleId: string }): Promise<IUserPublicEntity | null>

    updateUser(props: { userRole: IRoleEntity, firstName: string, lastName: string, id: string }): Promise<IUserPublicEntity | null>

    deleteUser(props: {id: string, userRole: IRoleEntity}): Promise<void>

    getAccount(props: {userRole: IRoleEntity}): Promise<IAccountPublicEntity | null>

    updateAccount(props: IUpdateAccountProps): Promise<IAccountPublicEntity | null>

    getUserRole(authId: string): Promise<IRoleEntity | null>

    getRoles(props: {userRole: IRoleEntity}): Promise<IRoleEntity[]>

    createRole(props: {userRole: IRoleEntity, newRole: IRoleEntity}): Promise<IRoleEntity | null>

    updateRole(props: {userRole: IRoleEntity, roleToUpdate: IRoleEntity}): Promise<IRoleEntity | null>

    updatePermission(props: {userRole: IRoleEntity, roleId: string, permission: IPermission}): Promise<IRoleEntity | null>

    deleteRole(props: {userRole: IRoleEntity, roleId: string}): Promise<void>

}