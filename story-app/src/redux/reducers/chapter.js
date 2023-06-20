import * as ActionTypes from "../actionTypes";

const defaultState = {
    newChapters: [],
    newChaptersLoading: true,
    chapterList: [],
    chapterListLoading: true,
    chapterDetail: null,
    chapterDetailLoading: true,
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
        case ActionTypes.GET_CHAPTER_DETAIL:
            return {
                ...state,
                chapterDetailLoading: true,
            };
        case ActionTypes.GET_CHAPTER_DETAIL_SUCCESS:
            return {
                ...state,
                chapterDetail: action.payload.results,
                chapterDetailLoading: false,
            };
        case ActionTypes.GET_CHAPTER_DETAIL_FAILED:
            return {
                ...state,
                chapterDetailLoading: false,
            };
        default:
            return state;
    }
}