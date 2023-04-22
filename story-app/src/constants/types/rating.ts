import { User } from "./user";

export interface Rating {
    _id: string,
    user: User,
    story: string,
    feedback: string,
    rating: number,
    likedUsers: User["_id"][],
    createdAt: string,
    updatedAt: string,
}