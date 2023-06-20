import { Chapter } from "@/constants/types/chapter";

export const getChapter = (next: boolean, numberOrder: number, chapterList: Chapter[]) => {
    const currenIndex = chapterList.findIndex((chapterItem) => chapterItem.numberOrder === numberOrder)

    if (currenIndex === -1) return null

    if (next) {
        return chapterList[currenIndex + 1]
    } else {
        return chapterList[currenIndex - 1]
    }
}