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
        case ActionTypes.RATING_STORY_SUCCESS: {
            const ratingItem = action.payload.results

            const detail = { ...state.detail }

            detail.totalRatings++

            detail.totalRatingPoints += ratingItem.rating

            return {
                ...state,
                detail
            };
        }
        case ActionTypes.LIKE_STORY_SUCCESS: {
            const { isStoryLiked } = action.payload.results

            const detail = { ...state.detail }

            if (isStoryLiked) {
                detail.totalLikes += 1
            } else {
                detail.totalLikes -= 1
            }

            return {
                ...state,
                detail
            };
        }
        case ActionTypes.FOLLOW_STORY_SUCCESS: {
            const { isStoryFollowed } = action.payload.results

            const detail = { ...state.detail }

            if (isStoryFollowed) {
                detail.totalFollows += 1
            } else {
                detail.totalFollows -= 1
            }

            return {
                ...state,
                detail
            };
        }
        default:
            return state;
    }
}