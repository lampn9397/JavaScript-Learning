import * as ActionTypes from "../actionTypes";

const defaultState = {
    commentList: [],
    commentLoading: true,
}

export default function commentReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_COMMENTS:
            return {
                ...state,
                commentLoading: true,
            };
        case ActionTypes.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                commentLoading: false,
                commentList: action.payload,
            };
        case ActionTypes.GET_COMMENTS_FAILED:
            return {
                ...state,
                commentLoading: false,
            };
        default:
            return state;
    }
}