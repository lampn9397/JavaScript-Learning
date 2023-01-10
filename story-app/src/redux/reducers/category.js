import * as ActionTypes from "../actionTypes";

const defaultState = {
    categories: [],
    getCategoryLoading: true,
}

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_CATEGORIES:
            return {
                ...state,
                getCategoryLoading: true,
            };
        case ActionTypes.GET_CATEGORIES_SUCCESS: {
            console.log('reducer', action.payload)
            return {
                ...state,
                getCategoryLoading: false,
                categories: action.payload,
            };
        }
        case ActionTypes.GET_CATEGORIES_FAILED:
            return {
                ...state,
                getCategoryLoading: false,
            };
        default:
            return state;
    }
}