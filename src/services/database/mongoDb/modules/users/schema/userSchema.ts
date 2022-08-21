import * as mongoose from "mongoose";
import {IUserEntity} from "../../../../../../modules/user/domain/interfaces/IUserEntity";

const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdOn: Number,
    modifiedOn: Number,
    firstName: String,
    lastName: String,
    email: String,
    authId: String,
})

userSchema.virtual('id').get(function () {
    this._id
})
export const UserModel = mongoose.model<IUserEntity>('User', userSchema)