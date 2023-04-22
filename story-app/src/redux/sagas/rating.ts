import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';
import { ReduxAction } from '@/constants/types/redux';

function* getRatingsAction({ payload }: ReduxAction) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/story/${payload.storyId}/rating?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_RATINGS_SUCCESS,
            payload: {
                results: data.results,
                page: payload.page,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_RATINGS_FAILED,
        });
    }
}

export default function* Rating() {
    yield takeEvery(ActionTypes.GET_RATINGS, getRatingsAction);
}