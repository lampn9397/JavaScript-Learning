import { Chapter } from "@/constants/types/chapter";
import * as ActionTypes from "../actionTypes";
import { ReduxAction } from "@/constants/types/redux";

interface DefaultState {
    newChapters: Chapter[],
    newChaptersLoading: boolean,
    chapterList: Chapter[],
    chapterListLoading: boolean,
    chapterDetail: Chapter | null,
    chapterDetailLoading: boolean,
    createStoryChapterLoading: boolean,
}

const defaultState: DefaultState = {
    newChapters: [],
    newChaptersLoading: true,
    chapterList: [],
    chapterListLoading: true,
    chapterDetail: null,
    chapterDetailLoading: true,
    createStoryChapterLoading: false,
}

export default function chapterReducer(state = defaultState, action: ReduxAction) {
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
        case ActionTypes.CREATE_STORY_CHAPTER:
            return {
                ...state,
                createStoryChapterLoading: true,
            };
        case ActionTypes.CREATE_STORY_CHAPTER_SUCCESS:
            return {
                ...state,
                createStoryChapterLoading: false,
            };
        case ActionTypes.CREATE_STORY_CHAPTER_FAILED:
            return {
                ...state,
                createStoryChapterLoading: false,
            };
        default:
            return state;
    }
}