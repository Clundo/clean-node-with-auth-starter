

export class BadRequestError extends Error {
    status: number
    constructor(customMessage?: string) {
        const message = customMessage ? `${customMessage}` : 'Bad Request'
        super(message)
        this.status = 400
    }
}

export class UnauthorizedError extends Error {
    status: number
    constructor(customMessage?: string) {
        const message = customMessage ? `${customMessage}` : 'Unauthorized'
        super(message)
        this.status = 401
    }
}


export class ForbiddenError extends Error {
    status: number
    constructor(customMessage?: string) {
        const message = customMessage ? `${customMessage}` : 'Forbidden'
        super(message)
        this.status = 403
    }
}


export class NotFoundError extends Error {
    status: number
    constructor(customMessage?: string) {
        const message = customMessage ? `${customMessage}` : 'Item not found'
        super(message)
        this.status = 404
    }

}

export class ServerError extends Error {
    status: number
    constructor(customMessage?: string) {
        const message = customMessage ? `${customMessage}` : 'Server Error'
        super(message)
        this.status = 500
    }
}

export class DatabaseError extends Error {
    status: number
    constructor(customMessage?: string) {
        const message = customMessage ? `${customMessage}` : 'Database Error'
        super(message)
        this.status = 500
    }
}
