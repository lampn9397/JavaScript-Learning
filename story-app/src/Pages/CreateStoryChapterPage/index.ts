import { connect, ConnectedProps } from "react-redux";

import CreateStoryChapterPage from "./CreateStoryChapterPage";
import { RootState } from "@/redux/store";
import { Chapter } from "../../constants/types/chapter";
import * as ActionTypes from '../../redux/actionTypes'
import { Story } from "@/constants/types/story";

const mapStateToProps = (state: RootState) => ({
    chapterList: state.chapter.chapterList,
    chapterListLoading: state.chapter.chapterListLoading,
    createStoryChapterLoading: state.chapter.createStoryChapterLoading,
});

const mapDispatchToProps = {
    createStoryChapter: (
        storyId: Story["_id"],
        numberOrder: Chapter["numberOrder"],
        chapterNumber: Chapter["chapterNumber"],
        bookNumber: Chapter["bookNumber"],
        bookName: Chapter["bookName"],
        name: Chapter["name"],
        content: Chapter["content"],
    ) => ({
        type: ActionTypes.CREATE_STORY_CHAPTER,
        payload: {
            storyId,
            numberOrder,
            chapterNumber,
            name,
            bookNumber,
            bookName,
            content,
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

export default connector(CreateStoryChapterPage)