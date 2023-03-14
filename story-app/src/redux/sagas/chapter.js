import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getChaptersAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        searchParams.set("sort", payload.sort)

        searchParams.set("sortType", payload.sortType)

        const { data } = yield axiosClient.get(`/story/${payload.slug}/chapter?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_CHAPTERS_SUCCESS,
            payload: { results: data.results, stateName: payload.stateName },
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_CHAPTERS_FAILED,
        });
    }
}

export default function* category() {
    yield takeEvery(ActionTypes.GET_CHAPTERS, getChaptersAction);
}