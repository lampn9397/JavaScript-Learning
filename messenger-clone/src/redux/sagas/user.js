import * as ActionTypes from '../actionTypes'
import { takeLeading, put, delay } from 'redux-saga/effects';

import { axiosClient } from '../../constants'

function* loginAction(action) {
    let errorMessage = 'Đăng nhập không thành công';

    try {
        const { payload } = action

        const { data } = yield axiosClient.post('/user/login', payload);

        axiosClient.defaults.headers.Authorization = `Bearer ${data.results}`;

        yield getUserInfo()

    } catch (error) {

    }
}

function* getUserInfo() {
    try {
        const { data } = yield axiosClient.get('/user');
        yield put({ type: ActionTypes.GET_USERINFO_SUCCESS, payload: data.results });
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_USERINFO_FAILED });

        alert(errorMessage);
    }
}

function* registerUser(action) {
    try {
        const { payload, callback } = action;

        const { data } = yield axiosClient.post('/user/register', payload);

        axiosClient.defaults.headers.Authorization = `Bearer ${data.results}`;

        yield getUserInfo()

        callback();

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.REGISTER_ACCOUNT_FAILED });

        alert(errorMessage);
    }
}

export default function* user() {
    yield takeLeading(ActionTypes.LOGIN, loginAction);
    yield takeLeading(ActionTypes.REGISTER_ACCOUNT, registerUser);
}