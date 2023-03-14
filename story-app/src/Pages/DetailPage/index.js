import { connect } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import DetailPage from "./DetailPage";

const mapStateToProps = (state) => ({
    detail: state.storyDetail.detail,
    detailLoading: state.storyDetail.detailLoading,
    newChapters: state.chapter.newChapters,
    chapterListLoading: state.chapter.chapterListLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getstoryDetail: (payload) => dispatch({
        type: ActionTypes.GET_STORY_DETAIL,
        payload
    }),

    getChapterList: (slug, stateName, page = 1, limit = 100, sort = "", sortType = "") => dispatch({
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)