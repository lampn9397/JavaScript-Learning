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
    userStoryList: null,
    userStoryListLoading: true,
    myFollowStoryList: [],
    myFollowStoryListLoading: true,
    myLikedStoryList: [],
    myLikedStoryListLoading: true,
    storyGenres: [],
    storyGenresLoading: true,
    createStoryLoading: true,
    updateStoryLoading: true,
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
        case ActionTypes.GET_USER_STORY_LIST:
            return {
                ...state,
                userStoryListLoading: true,
            };
        case ActionTypes.GET_USER_STORY_LIST_SUCCESS:
            return {
                ...state,
                userStoryList: action.payload.results,
                userStoryListLoading: false,
            };
        case ActionTypes.GET_USER_STORY_LIST_FAILED:
            return {
                ...state,
                userStoryListLoading: false,
            }
        case ActionTypes.GET_MY_FOLLOW_STORY:
            return {
                ...state,
                myFollowStoryListLoading: true,
            };
        case ActionTypes.GET_MY_FOLLOW_STORY_SUCCESS:
            return {
                ...state,
                myFollowStoryList: action.payload.results,
                myFollowStoryListLoading: false,
            };
        case ActionTypes.GET_MY_FOLLOW_STORY_FAILED:
            return {
                ...state,
                myFollowStoryListLoading: false,
            };
        case ActionTypes.GET_MY_LIKED_STORY:
            return {
                ...state,
                myLikedStoryListLoading: true,
            };
        case ActionTypes.GET_MY_LIKED_STORY_SUCCESS:
            return {
                ...state,
                myLikedStoryList: action.payload.results,
                myLikedStoryListLoading: false,
            };
        case ActionTypes.GET_MY_LIKED_STORY_FAILED:
            return {
                ...state,
                myLikedStoryListLoading: false,
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
        case ActionTypes.GET_STORY_GENRE:
            return {
                ...state,
                storyGenresLoading: true,
            };
        case ActionTypes.GET_STORY_GENRE_SUCCESS:
            return {
                ...state,
                storyGenres: action.payload.results,
                storyGenreLoading: false,
            };
        case ActionTypes.GET_STORY_GENRE_FAILED:
            return {
                ...state,
                storyGenreLoading: false,
            };
        case ActionTypes.CREATE_STORY:
            return {
                ...state,
                createStoryLoading: true,
            };
        case ActionTypes.CREATE_STORY_SUCCESS:
            return {
                ...state,
                createStoryLoading: false,
            };
        case ActionTypes.CREATE_STORY_FAILED:
            return {
                ...state,
                createStoryLoading: false,
            };
        case ActionTypes.UPDATE_STORY:
            return {
                ...state,
                updateStoryLoading: true,
            };
        case ActionTypes.UPDATE_STORY_SUCCESS:
            return {
                ...state,
                updateStoryLoading: false,
            };
        case ActionTypes.UPDATE_STORY_FAILED:
            return {
                ...state,
                updateStoryLoading: false,
            };
        default:
            return state;
    }
}