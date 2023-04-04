import { User } from "./user";

export interface Comment {
    _id: string,
    user: User,
    story: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}