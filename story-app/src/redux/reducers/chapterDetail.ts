import { ReduxAction } from "@/constants/types/redux";
import * as ActionTypes from "../actionTypes";
import ChapterDetail from "@/constants/types/chapterDetail";

interface DefaultState {
    chapterDetail: ChapterDetail | null,
    chapterDetailLoading: boolean,
}

const defaultState: DefaultState = {
    chapterDetail: null,
    chapterDetailLoading: true,
}

export default function chapterDetailReducer(state = defaultState, action: ReduxAction) {
    switch (action.type) {
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