import { connect } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import HomePage from "./HomePage";

const mapStateToProps = (state) => ({
        categories: state.category.categories,
        topFiveStories: state.category.topFiveStories,
});

const mapDispatchToProps = (dispatch) => ({
        getCategories: () => dispatch({ type: ActionTypes.GET_CATEGORIES }),
        getTopFiveStories: () => dispatch({ type: ActionTypes.GET_TOPFIVESTORY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)