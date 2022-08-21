import {ObjectId} from "mongodb";

export class MongoId {
    constructor () {

    }

    makeId (e?: string) {
        const id = new ObjectId(e)
        return id.toString()
    }
    isValid(id: any) {
        return ObjectId.isValid(id)
    }
}