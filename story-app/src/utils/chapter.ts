import { LocalStorageKey } from "../constants";
import { Chapter } from "@/constants/types/chapter";
import ChapterDetail from "@/constants/types/chapterDetail";
import ReadingProgress from "@/constants/types/readingProgress";
import { Story } from "../constants/types/story";

export const getChapter = (next: boolean, numberOrder: number, chapterList: Chapter[]) => {
    const currenIndex = chapterList.findIndex((chapterItem) => chapterItem.numberOrder === numberOrder)

    if (currenIndex === -1) return null

    if (next) {
        return chapterList[currenIndex + 1]
    } else {
        return chapterList[currenIndex - 1]
    }
}

export const getReadingProgress = (slug: Story["slug"]) => {
    const value = localStorage.getItem(LocalStorageKey.READING_PROGRESS)

    if (!value) return undefined

    const progressList: ReadingProgress[] = JSON.parse(value)

    const progressIndex = progressList.findIndex((item) => item.storySlug === slug)

    return {
        progress: progressList[progressIndex],
        progressList,
        progressIndex,
    }
}

export const saveReadingProgress = (slug: Story["slug"], numberOrder: ChapterDetail["numberOrder"], y: number) => {
    const readingProgress = getReadingProgress(slug)

    const currentProgress: ReadingProgress = { storySlug: slug, chapterNumberOrder: numberOrder, y }

    if (!readingProgress) {
        localStorage.setItem(LocalStorageKey.READING_PROGRESS, JSON.stringify([currentProgress]))
        return
    }

    if (!readingProgress.progress) {
        readingProgress.progressList.push(currentProgress)
    } else {
        readingProgress.progressList[readingProgress.progressIndex] = currentProgress
    }

    localStorage.setItem(LocalStorageKey.READING_PROGRESS, JSON.stringify(readingProgress.progressList))
}
