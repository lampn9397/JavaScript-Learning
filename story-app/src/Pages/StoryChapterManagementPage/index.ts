import { connect, ConnectedProps } from "react-redux";

import StoryChapterManagementPage from "./StoryChapterManagementPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'

const mapStateToProps = (state: RootState) => ({
    chapterList: state.chapter.chapterList,
    chapterListLoading: state.chapter.chapterListLoading,
    detail: state.storyDetail.detail,
    detailLoading: state.storyDetail.detailLoading,
});

const mapDispatchToProps = {
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

    getstoryDetail: (payload: any) => ({
        type: ActionTypes.GET_STORY_DETAIL,
        payload
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(StoryChapterManagementPage)