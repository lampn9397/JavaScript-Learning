import { connect } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import DetailPage from "./DetailPage";

const mapStateToProps = (state) => ({
    detail: state.storyDetail.detail,
    detailLoading: state.storyDetail.detailLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getstoryDetail: (payload) => dispatch({
        type: ActionTypes.GET_STORY_DETAIL,
        payload
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)