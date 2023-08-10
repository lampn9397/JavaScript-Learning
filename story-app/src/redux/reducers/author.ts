import { ReduxAction } from "@/constants/types/redux";
import * as ActionTypes from "../actionTypes";
import { Author } from "@/constants/types/author";

interface DefaultState {
    authorList: Author[],
    authorListLoading: boolean,
}

const defaultState: DefaultState = {
    authorList: [],
    authorListLoading: true,
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
        default:
            return state;
    }
}