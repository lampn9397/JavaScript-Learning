import * as ActionTypes from '../actionTypes'
import { takeLeading, put, takeEvery } from 'redux-saga/effects';

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

export default function* category() {
    yield takeEvery(ActionTypes.GET_STORIES, getStoriesAction);
}