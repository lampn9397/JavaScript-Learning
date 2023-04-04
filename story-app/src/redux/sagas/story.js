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

export default function* category() {
    yield takeEvery(ActionTypes.GET_STORIES, getStoriesAction);
    yield takeEvery(ActionTypes.GET_STORY_BY_AUTHOR, getStoryByAuthorAction);
}