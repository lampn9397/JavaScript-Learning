import * as ActionTypes from "../actionTypes";

const defaultState = {
    topFiveStories: [],
    topFiveStoriesLoading: true,
    newStories: [],
    newStoriesLoading: true,
    newStoryList: [],
    newStoryListLoading: true,
    storyViewsRankingList: [],
    storyViewsRankingListLoading: true,
}

export default function storyReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_STORIES:
            return {
                ...state,
                [`${action.payload.stateName}Loading`]: true,
            };
        case ActionTypes.GET_STORIES_SUCCESS:
            return {
                ...state,
                [action.payload.stateName]: action.payload.results,
                [`${action.payload.stateName}Loading`]: false,
            };
        case ActionTypes.GET_STORIES_FAILED:
            return {
                ...state,
                [`${action.payload.stateName}Loading`]: false,
            };
        default:
            return state;
    }
}