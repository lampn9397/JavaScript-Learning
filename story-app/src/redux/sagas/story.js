import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getStoriesAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        searchParams.set("sort", payload.sort)

        searchParams.set("status", payload.status)

        const { data } = yield axiosClient.get(`/story?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_STORIES_SUCCESS,
            payload: { results: data.results, stateName: payload.stateName }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_STORIES_FAILED,
            payload: { stateName: payload.stateName }
        });
    }
}

function* getStoryByAuthorAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        searchParams.set("sort", payload.sort)

        searchParams.set("excludeStory", payload.storySlug)

        const { data } = yield axiosClient.get(`/author/${payload.authorId}/story?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_STORY_BY_AUTHOR_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_STORY_BY_AUTHOR_FAILED, });
    }
}

function* likeStoryAction({ payload }) {
    try {
        const { data } = yield axiosClient.post(`/story/${payload.storyId}/like`);

        yield put({
            type: ActionTypes.LIKE_STORY_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.LIKE_STORY_FAILED, });
    }
}

function* getLikeStoryStatusAction({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story/${payload.storyId}/like`);

        yield put({
            type: ActionTypes.GET_LIKE_STORY_STATUS_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_LIKE_STORY_STATUS_FAILED, });
    }
}
function* followStoryAction({ payload }) {
    try {
        const { data } = yield axiosClient.post(`/story/${payload.storyId}/follow`);

        yield put({
            type: ActionTypes.FOLLOW_STORY_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.FOLLOW_STORY_FAILED, });
    }
}

function* getfollowStoryStatusAction({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story/${payload.storyId}/follow`);

        yield put({
            type: ActionTypes.GET_FOLLOW_STORY_STATUS_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_FOLLOW_STORY_STATUS_FAILED, });
    }
}

export default function* category() {
    yield takeEvery(ActionTypes.GET_STORIES, getStoriesAction);
    yield takeEvery(ActionTypes.GET_STORY_BY_AUTHOR, getStoryByAuthorAction);
    yield takeEvery(ActionTypes.LIKE_STORY, likeStoryAction);
    yield takeEvery(ActionTypes.GET_LIKE_STORY_STATUS, getLikeStoryStatusAction);
    yield takeEvery(ActionTypes.FOLLOW_STORY, followStoryAction);
    yield takeEvery(ActionTypes.GET_FOLLOW_STORY_STATUS, getfollowStoryStatusAction);
}