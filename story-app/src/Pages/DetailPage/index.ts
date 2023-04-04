import { connect, ConnectedProps } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import DetailPage from "./DetailPage";

const mapStateToProps = (state: any) => ({
    detail: state.storyDetail.detail,
    detailLoading: state.storyDetail.detailLoading,
    newChapters: state.chapter.newChapters,
    newChaptersLoading: state.chapter.newChaptersLoading,
    chapterList: state.chapter.chapterList,
    chapterListLoading: state.chapter.chapterListLoading,
    storyByAuthorList: state.story.storyByAuthorList,
    storyByAuthorListLoading: state.story.storyByAuthorListLoading,
    commentList: state.comment.commentList,
    commentListLoading: state.comment.commentListLoading,
});

const mapDispatchToProps = {
    getstoryDetail: (payload: any) => ({
        type: ActionTypes.GET_STORY_DETAIL,
        payload
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

    getStoryByAuthor: (authorId: string, storySlug: string) => ({
        type: ActionTypes.GET_STORY_BY_AUTHOR,
        payload: {
            authorId,
            storySlug,
            sort: "totalViews",
            page: 1,
            limit: 100,
        }
    }),

    getComment: (storyId: string, page = 1, limit = 100) => ({
        type: ActionTypes.GET_COMMENTS,
        payload: {
            storyId,
            page: 1,
            limit: 100,
        }
    })
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DetailPage)