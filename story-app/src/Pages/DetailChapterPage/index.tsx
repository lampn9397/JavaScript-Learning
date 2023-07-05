import { connect, ConnectedProps } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import DetailChapterPage from "./DetailChapterPage";
import { RootState } from "@/redux/store";
import { pageLimit } from "../../constants";

const mapStateToProps = (state: RootState) => ({
    chapterDetail: state.chapterDetail.chapterDetail,
    chapterDetailLoading: state.chapterDetail.chapterDetailLoading,
    chapterList: state.chapter.chapterList,
    chapterListLoading: state.chapter.chapterListLoading,
    theme: state.readingConfig.theme,
    font: state.readingConfig.font,
    fontSize: state.readingConfig.fontSize,
    commentList: state.comment.commentList,
    commentListLoading: state.comment.commentListLoading,
    detail: state.storyDetail.detail,
    detailLoading: state.storyDetail.detailLoading,
    user: state.auth.user,
});

const mapDispatchToProps = {
    getChapterDetail: (slug: string, chapterNumber: string) => ({
        type: ActionTypes.GET_CHAPTER_DETAIL,
        payload: {
            slug,
            chapterNumber
        }
    }),

    getChapterList: (slug: string, stateName: string, page = 1, limit = 100, sort = "", sortType = "") => ({
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

    getstoryDetail: (payload: any) => ({
        type: ActionTypes.GET_STORY_DETAIL,
        payload
    }),

    getComments: (storyId: string, page = 1, limit = pageLimit) => ({
        type: ActionTypes.GET_COMMENTS,
        payload: {
            storyId,
            page,
            limit,
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DetailChapterPage)