import { delay, put, takeLeading } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as ActionTypes from '../actionTypes';
import { axiosClient, routes } from '../../constants';


function* getMusicAction() {
    try {
        const { data } = yield axiosClient.get('/song/list');
        yield delay(1000)

        yield put({ type: ActionTypes.GET_MUSICS_SUCCESS, payload: data.results });
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_MUSICS_FAILED });

        alert(errorMessage);
    }
}

function* getMusicDetailAction(action) {

    const { payload } = action;

    try {
        const { data } = yield axiosClient.get(`/song/${payload}`);
        yield delay(1000)
        yield put({ type: ActionTypes.GET_MUSICDETAIL_SUCCESS, payload: data.results });
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;
        yield put({ type: ActionTypes.GET_MUSICDETAIL_FAILED });

        alert(errorMessage);
    }
}

function* getAllSongAction(action) {

    const { payload } = action;
    try {
        const { data } = yield axiosClient.get('/song');
        yield delay(1000)
        yield put({ type: ActionTypes.GET_ALLSONG_SUCCESS, payload: data.results });
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_ALLSONG_FAILED });

        alert(errorMessage);
    }
}

function* getSongForSlideAction() {
    try {
        const { data } = yield axiosClient.get('/song/hot');
        yield delay(1000)

        yield put({ type: ActionTypes.GET_HOTSONGFORSLIDE_SUCCESS, payload: data.results });
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_HOTSONGFORSLIDE_FAILED });

        alert(errorMessage);
    }
}


export default function* appSaga() {
    yield takeLeading(ActionTypes.GET_MUSICS, getMusicAction);
    yield takeLeading(ActionTypes.GET_MUSICDETAIL, getMusicDetailAction);
    yield takeLeading(ActionTypes.GET_ALLSONG, getAllSongAction);
    yield takeLeading(ActionTypes.GET_HOTSONGFORSLIDE, getSongForSlideAction);
}