import { Chapter } from "./chapter";
import { Story } from "./story";
import { User } from "./user";

export default interface ChapterDetail extends Omit<Chapter, "story" | "uploader"> { //Omit loai tru` truong` uploader trong Story
    story: Pick<Story, "_id" | "name"> //Pick chon truong` name,Id trong Story
    uploader: Pick<User, "_id" | "name">
}