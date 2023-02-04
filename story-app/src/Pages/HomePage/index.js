import { connect } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import HomePage from "./HomePage";

const mapStateToProps = (state) => ({
    categories: state.category.categories,
    topFiveStories: state.story.topFiveStories,
    newStories: state.story.newStories,
});

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => dispatch({ type: ActionTypes.GET_CATEGORIES }),
    getStories: (stateName, page = 1, limit = 5, sort = "") => dispatch({
        type: ActionTypes.GET_STORIES,
        payload: {
            page,
            limit,
            sort,
            stateName,
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)