import { ReduxAction } from "@/constants/types/redux";
import * as ActionTypes from "../actionTypes";
import { Author } from "@/constants/types/author";

interface DefaultState {
    authorList: Author[],
    authorListLoading: boolean,
    authorDetail: Author | null,
    authorDetailLoading: boolean,
    myStoryAuthorList: Author[],
    myStoryAuthorListLoading: boolean,
}

const defaultState: DefaultState = {
    authorList: [],
    authorListLoading: true,
    authorDetail: null,
    authorDetailLoading: true,
    myStoryAuthorList: [],
    myStoryAuthorListLoading: true,
}

export default function authorReducer(state = defaultState, action: ReduxAction) {
    switch (action.type) {
        case ActionTypes.GET_AUTHORS:
            return {
                ...state,
                authorListLoading: true,
            };
        case ActionTypes.GET_AUTHORS_SUCCESS:
            return {
                ...state,
                authorListLoading: false,
                authorList: action.payload.results
            }
        case ActionTypes.GET_AUTHORS_FAILED:
            return {
                ...state,
                authorListLoading: false,
            };
        case ActionTypes.GET_AUTHOR_DETAIL:
            return {
                ...state,
                authorDetailLoading: true,
            };
        case ActionTypes.GET_AUTHOR_DETAIL_SUCCESS:
            return {
                ...state,
                authorDetailLoading: false,
                authorDetail: action.payload.results
            }
        case ActionTypes.GET_AUTHOR_DETAIL_FAILED:
            return {
                ...state,
                authorDetailLoading: false,
            };
        case ActionTypes.GET_MY_STORY_AUTHORS:
            return {
                ...state,
                myStoryAuthorListLoading: true,
            };
        case ActionTypes.GET_MY_STORY_AUTHORS_SUCCESS:
            return {
                ...state,
                myStoryAuthorListLoading: false,
                myStoryAuthorList: action.payload.results
            }
        case ActionTypes.GET_MY_STORY_AUTHORS_FAILED:
            return {
                ...state,
                myStoryAuthorListLoading: false,
            };
        default:
            return state;
    }
}