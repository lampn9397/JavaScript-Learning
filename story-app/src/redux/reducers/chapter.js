import * as ActionTypes from "../actionTypes";

const defaultState = {
    newChapters: [],
    newChaptersLoading: true,
    chapterList: [],
    chapterListLoading: true,
}

export default function chapterReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_CHAPTERS:
            return {
                ...state,
                [`${action.payload.stateName}Loading`]: true,
            };
        case ActionTypes.GET_CHAPTERS_SUCCESS:
            return {
                ...state,
                [action.payload.stateName]: action.payload.results,
                [`${action.payload.stateName}Loading`]: false,
            };
        case ActionTypes.GET_CHAPTERS_FAILED:
            return {
                ...state,
                [`${action.payload.stateName}Loading`]: false,
            };
        default:
            return state;
    }
}