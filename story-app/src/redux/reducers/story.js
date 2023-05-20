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
    storyLikesRankingList: [],
    storyLikesRankingListLoading: true,
    storyFollowsRankingList: [],
    storyFollowsRankingListLoading: true,
    newCompleteStory: [],
    newCompleteStoryLoading: true,
    storyByAuthorList: [],
    storyByAuthorListLoading: true,
    isStoryLiked: false,
    isStoryFollowed: false,
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
        case ActionTypes.GET_STORY_BY_AUTHOR:
            return {
                ...state,
                storyByAuthorListLoading: true,
            };
        case ActionTypes.GET_STORY_BY_AUTHOR_SUCCESS:
            return {
                ...state,
                storyByAuthorList: action.payload.results,
                storyByAuthorListLoading: false,
            };
        case ActionTypes.GET_STORY_BY_AUTHOR_FAILED:
            return {
                ...state,
                storyByAuthorListLoading: false,
            };
        case ActionTypes.LIKE_STORY_SUCCESS: //gop case dong` 57 va 58
        case ActionTypes.GET_LIKE_STORY_STATUS_SUCCESS:
            return {
                ...state,
                isStoryLiked: action.payload.results.isStoryLiked,
            };
        case ActionTypes.FOLLOW_STORY_SUCCESS: //gop case dong` 57 va 58
        case ActionTypes.GET_FOLLOW_STORY_STATUS_SUCCESS:
            return {
                ...state,
                isStoryFollowed: action.payload.results.isStoryFollowed,
            };
        default:
            return state;
    }
}