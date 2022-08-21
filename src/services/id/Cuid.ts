import cuid from "cuid";

export class Cuid {
    constructor() {}

    makeId () {
        return cuid()
    }
    isValid(id: any) {
        return cuid.isCuid(id)
    }
}