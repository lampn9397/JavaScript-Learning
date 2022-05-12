import * as ActionTypes from '../actionTypes'
import { takeLeading, put } from 'redux-saga/effects';

import { axiosClient, localStorageKey } from '../../constants'

function* checkLogin() {

    const token = localStorage.getItem(localStorageKey.token);

    if (!token) {
        yield put({ type: ActionTypes.CHECK_LOGIN_DONE });
        return;
    }
    axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

    yield getUserInfo()
}

function* loginAction(action) {

    try {
        const { payload } = action

        const { data } = yield axiosClient.post('/user/login', payload);

        axiosClient.defaults.headers.Authorization = `Bearer ${data.results}`;

        localStorage.setItem(localStorageKey.token, data.results);

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
function* checkLogout() {
    localStorage.removeItem(localStorageKey.token);
    yield put({ type: ActionTypes.LOGOUT_DONE });

}

export default function* user() {
    yield takeLeading(ActionTypes.LOGIN, loginAction);
    yield takeLeading(ActionTypes.REGISTER_ACCOUNT, registerUser);
    yield takeLeading(ActionTypes.CHECK_LOGIN, checkLogin);
    yield takeLeading(ActionTypes.LOGOUT, checkLogout);
}