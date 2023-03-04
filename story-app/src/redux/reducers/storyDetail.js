import * as ActionTypes from "../actionTypes";

const defaultState = {
    detail: null,
    detailLoading: true,
}

export default function storyDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_STORY_DETAIL:
            return {
                ...state,
                detailLoading: true,
            };
        case ActionTypes.GET_STORY_DETAIL_SUCCESS:
            return {
                ...state,
                detail: action.payload,
                detailLoading: false,
            };
        case ActionTypes.GET_STORY_DETAIL_FAILED:
            return {
                ...state,
                detailLoading: false,
            };
        default:
            return state;
    }
}