import { Author } from "./author"

export interface StoryTag {
    _id: string,
    name: string,
    slug: string,
}

export interface Story {
    _id: string,
    name: string,
    author: Author,
    genre: {
        _id: string,
        name: string,
        slug: string,
    },
    category: {
        _id: string,
        name: string,
        slug: string,
        storyCount: number
    },
    tags: StoryTag[],
    status: string,
    totalLikes: number,
    totalViews: number,
    totalFollows: number,
    totalRatings: number,
    totalChapter: number,
    totalComment: number,
    uploader: {
        _id: string,
        name: string,
    },
    poster: string,
    description: string,
    isPublish: true,
    slug: string,
    storyUpdateAt: string,
    createdAt: string,
    updatedAt: string,
    totalRatingPoints: number
}