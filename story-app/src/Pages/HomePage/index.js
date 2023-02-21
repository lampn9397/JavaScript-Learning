import { connect } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import HomePage from "./HomePage";

const mapStateToProps = (state) => ({
    categories: state.category.categories,
    topFiveStories: state.story.topFiveStories,
    newStories: state.story.newStories,
    newStoryList: state.story.newStoryList,
    storyViewsRankingList: state.story.storyViewsRankingList,
    storyLikesRankingList: state.story.storyLikesRankingList,
    storyFollowsRankingList: state.story.storyFollowsRankingList,
    newCompleteStory: state.story.newCompleteStory,
});

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => dispatch({ type: ActionTypes.GET_CATEGORIES }),
    getStories: (stateName, page = 1, limit = 5, sort = "", status = "") => dispatch({
        type: ActionTypes.GET_STORIES,
        payload: {
            page,
            limit,
            sort,
            stateName,
            status,
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)