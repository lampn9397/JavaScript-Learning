import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getCommentsAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/story/${payload.storyId}/comment?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_COMMENTS_SUCCESS,
            payload: {
                results: data.results,
                page: payload.page,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_COMMENTS_FAILED,
        });
    }
}

export default function* comment() {
    yield takeEvery(ActionTypes.GET_COMMENTS, getCommentsAction);
}