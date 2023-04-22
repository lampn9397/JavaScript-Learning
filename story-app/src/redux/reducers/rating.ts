import { ReduxAction } from "@/constants/types/redux";
import * as ActionTypes from "../actionTypes";

const defaultState = {
    ratingList: [],
    ratingListLoading: true,
}

export default function ratingReducer(state = defaultState, action: ReduxAction) {
    switch (action.type) {
        case ActionTypes.GET_RATINGS:
            return {
                ...state,
                ratingListLoading: true,
            };
        case ActionTypes.GET_RATINGS_SUCCESS: {
            let ratingList = action.payload.results

            if (action.payload.page > 1) {
                ratingList = [...state.ratingList, ...ratingList]
            }

            return {
                ...state,
                ratingListLoading: false,
                ratingList
            }
        }
        case ActionTypes.GET_RATINGS_FAILED:
            return {
                ...state,
                ratingListLoading: false,
            };
        default:
            return state;
    }
}