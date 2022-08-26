enum sections {
    USERS = 'users',
    ACCOUNT = 'account'
}

interface IPermission {
    section: sections
    canRead: boolean
    canCreate: boolean
    canWrite: boolean
    canDelete: boolean
}

export interface IRole {
    name: string
    permissions: IPermission[]
}