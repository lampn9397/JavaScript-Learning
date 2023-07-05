import ChapterDetail from "./chapterDetail";
import { Story } from "./story";

export default interface ReadingProgress {
    storySlug: Story['slug'],
    chapterNumberOrder: ChapterDetail['numberOrder'],
    y: number,
}