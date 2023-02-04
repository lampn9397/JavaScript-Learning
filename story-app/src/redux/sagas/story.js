import * as ActionTypes from '../actionTypes'
import { takeLeading, put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getStoriesAction({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`);

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