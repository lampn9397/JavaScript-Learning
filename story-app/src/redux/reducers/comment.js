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
        case ActionTypes.GET_COMMENTS_SUCCESS: {
            let commentList = action.payload.results

            if (action.payload.page > 1) {
                commentList = [...state.commentList, ...commentList]
            }

            return {
                ...state,
                commentLoading: false,
                commentList
            }
        }
        case ActionTypes.GET_COMMENTS_FAILED:
            return {
                ...state,
                commentLoading: false,
            };
        default:
            return state;
    }
}