import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient, responseStatus } from '../../constants';

function* getMusicAction() {

    let errorMessage = '';

    try {
        const { data } = yield axiosClient.get('/song/list');


        yield put({ type: ActionTypes.GET_MUSICS_SUCCESS, payload: data.data });


        errorMessage = data.errors.jwt_mdlw_error;
    } catch (error) {
        errorMessage = error.response?.data?.errors?.jwt_mdlw_error ?? error.message;
    }

    yield put({ type: ActionTypes.GET_MUSICS_FAILED });

    alert(errorMessage);
}

export default function* appSaga() {
    yield takeLeading(ActionTypes.GET_MUSICS, getMusicAction);
}