import { delay, put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient } from '../../constants';

function* getSongRank() {
    try {
        const { data } = yield axiosClient.get('/song/rank');
        yield delay(1000)
        yield put({ type: ActionTypes.GET_MUSICRANK_SUCCESS, payload: data.results });
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_MUSICRANK_FAILED });

        alert(errorMessage);
    }
}

export default function* appSaga() {
    yield takeLeading(ActionTypes.GET_MUSICRANK, getSongRank);
}