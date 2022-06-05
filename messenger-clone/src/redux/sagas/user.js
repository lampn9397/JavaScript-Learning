import * as ActionTypes from '../actionTypes'
import { takeLeading, put } from 'redux-saga/effects';

import { axiosClient, localStorageKey } from '../../constants'
import { push } from 'connected-react-router';

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

        yield put(push('/'))

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

function* updaterUser(action) {
    try {
        const { payload, callback } = action;

        const formData = new FormData();

        formData.append('firstName', payload.firstName)

        formData.append('lastName', payload.firstName)

        formData.append('gender', payload.gender)

        if (payload.avatar.file) {
            formData.append('avatar', payload.avatar.file)
        }

        formData.append('phone', payload.phone)

        formData.append('email', payload.email)

        const { data } = yield axiosClient.put('/user', formData);

        yield put({ type: ActionTypes.UPDATE_USERINFO_SUCCESS, payload: data.results });

        callback();

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.UPDATE_USERINFO_FAILED });

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
    yield takeLeading(ActionTypes.UPDATE_USERINFO, updaterUser);
    yield takeLeading(ActionTypes.CHECK_LOGIN, checkLogin);
    yield takeLeading(ActionTypes.LOGOUT, checkLogout);
}