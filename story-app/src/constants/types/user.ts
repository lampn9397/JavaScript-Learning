export interface User {
    _id: string,
    username: string,
    email: string,
    name: string,
    gender: boolean,
    avatar: string,
    lastLogin: string,
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}