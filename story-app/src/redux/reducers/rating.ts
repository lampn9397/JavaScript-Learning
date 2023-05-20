import { ReduxAction } from "@/constants/types/redux";
import * as ActionTypes from "../actionTypes";
import { Rating } from "../../constants/types/rating";

interface DefaultState {
    ratingList: Rating[],
    ratingListLoading: boolean,
    createRatingLoading: boolean,
}

const defaultState: DefaultState = {
    ratingList: [],
    ratingListLoading: true,
    createRatingLoading: false,
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
        case ActionTypes.RATING_STORY:
            return {
                ...state,
                createRatingLoading: true,
            };
        case ActionTypes.RATING_STORY_SUCCESS: {
            const ratingItem = action.payload.results as Rating

            let ratingList = [...state.ratingList]

            const ratingItemIndex = ratingList.findIndex((item) => item._id === ratingItem._id)

            if (ratingItemIndex !== -1) {
                ratingList[ratingItemIndex] = ratingItem
            } else {
                ratingList = [ratingItem, ...ratingList]
            }

            return {
                ...state,
                createRatingLoading: false,
                ratingList
            }
        }
        case ActionTypes.RATING_STORY_FAILED:
            return {
                ...state,
                createRatingLoading: false,
            };
        default:
            return state;
    }
}