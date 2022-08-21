import {DatabaseService} from "../../../../../../config/dependencies";
import {IUserEntity} from "../../../../../../modules/user/domain/interfaces/IUserEntity";
import {UserModel} from "../schema/userSchema";
import {DatabaseError} from "../../../../../../lib/errors";
import {UserEntity} from "../../../../../../modules/user/domain/entities/userEntity";
import {IUserRepository} from "../../../../../../modules/user/domain/interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

    constructor() {
    }

    async initCollection() {
        await DatabaseService.initDatabase()
    }

    async create(userInstance: IUserEntity) {
        try {
            //Need to extract fields due to underscore in entity, or nothing is saved
            const {
                id: _id,
                firstName,
                lastName,
                email,
                authId,
                modifiedOn,
                createdOn
            } = userInstance
            const user = new UserModel({
                _id,
                firstName,
                lastName,
                email,
                authId,
                modifiedOn,
                createdOn
            })
            await user.save()

            return new UserEntity(user)

        } catch (err) {
            throw err
        }
    }

    async update(userInstance: IUserEntity) {
        try {

            //Need to extract props, or this is not updated due to underscore
            const {
                id: _id,
                firstName,
                lastName,
                email,
                modifiedOn
            } = userInstance
            const user = await UserModel.findByIdAndUpdate(_id, {
                firstName,
                lastName,
                email,
                modifiedOn
            }).populate('organization', '-users')

            if(!user) throw new DatabaseError()

            return new UserEntity(user)
        } catch (err) {
            throw err
        }
    }

    async delete(userId: string) {
        try {
            return await UserModel.findByIdAndDelete(userId)

        } catch (err) {
            throw err
        }
    }



    async getOneById(userId: string) {

        try {
            const user = await UserModel.findById(userId)
            if (!user) return null
            return new UserEntity(user)

        } catch (err) {
            throw err
        }
    }

    async getOneByEmail(email: string) {

        try {
            const user = await UserModel.findOne({email})
            if (!user) return null
            return new UserEntity(user)

        } catch (err) {
            throw err
        }
    }

}