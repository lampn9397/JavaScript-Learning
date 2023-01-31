import * as ActionTypes from "../actionTypes";

const defaultState = {
    categories: [],
    getCategoryLoading: true,
    topFiveStories: [],
    topFiveStoriesLoading: true,
}

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_CATEGORIES:
            return {
                ...state,
                getCategoryLoading: true,
            };
        case ActionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                getCategoryLoading: false,
                categories: action.payload,
            };
        case ActionTypes.GET_CATEGORIES_FAILED:
            return {
                ...state,
                getCategoryLoading: false,
            };
        case ActionTypes.GET_TOPFIVESTORY:
            return {
                ...state,
                topFiveStoriesLoading: true,
            };
        case ActionTypes.GET_TOPFIVESTORY_SUCCESS:
            return {
                ...state,
                topFiveStoriesLoading: false,
                topFiveStories: action.payload,
            };
        case ActionTypes.GET_TOPFIVESTORY_FAILED:
            return {
                ...state,
                topFiveStoriesLoading: false,
            };
        default:
            return state;
    }
}