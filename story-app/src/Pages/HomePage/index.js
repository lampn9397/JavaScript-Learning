import { connect } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import HomePage from "./HomePage";

const mapStateToProps = (state) => {
    return {
        categories: state.category.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch({ type: ActionTypes.GET_CATEGORIES })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)