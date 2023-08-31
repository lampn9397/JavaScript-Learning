import { connect, ConnectedProps } from "react-redux";

import UpdateStoryChapterPage from "./UpdateStoryChapterPage";
import { RootState } from "@/redux/store";
import { Chapter } from "../../constants/types/chapter";
import * as ActionTypes from '../../redux/actionTypes'
import { Story } from "@/constants/types/story";

const mapStateToProps = (state: RootState) => ({
    chapterList: state.chapter.chapterList,
    chapterListLoading: state.chapter.chapterListLoading,
    createStoryChapterLoading: state.chapter.createStoryChapterLoading,
    chapterDetail: state.chapterDetail.chapterDetail,
    chapterDetailLoading: state.chapterDetail.chapterDetailLoading,
});

const mapDispatchToProps = {
    updateStoryChapter: (
        storyId: Story["_id"],
        chapterId: Chapter["_id"],
        numberOrder: Chapter["numberOrder"],
        chapterNumber: Chapter["chapterNumber"],
        bookNumber: Chapter["bookNumber"],
        bookName: Chapter["bookName"],
        name: Chapter["name"],
        content: Chapter["content"],
    ) => ({
        type: ActionTypes.UPDATE_STORY_CHAPTER,
        payload: {
            storyId,
            chapterId,
            numberOrder,
            chapterNumber,
            name,
            bookNumber,
            bookName,
            content,
        }
    }),

    getChapterDetail: (slug: string, chapterNumber: string) => ({
        type: ActionTypes.GET_CHAPTER_DETAIL,
        payload: {
            slug,
            chapterNumber
        }
    }),

    getChapterList: (slug: string, stateName: string, page = 1, limit = 9999, sort = "", sortType = "") => ({
        type: ActionTypes.GET_CHAPTERS,
        payload: {
            slug,
            stateName,
            page,
            limit,
            sort,
            sortType,
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(UpdateStoryChapterPage)