import * as ActionTypes from '../actionTypes'
import { takeLeading, put, debounce } from 'redux-saga/effects';
import moment from 'moment';

import { axiosClient, localStorageKey } from '../../constants'
import { push } from 'connected-react-router';
import i18n from '../../utils/i18n'
import { apiErrorHandle } from '../../utils';

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
        apiErrorHandle(error)
    }
}

function* getUserInfo() {
    try {
        const { data } = yield axiosClient.get('/user');

        i18n.changeLanguage(data.results.language);

        axiosClient.defaults.headers['Accept-Language'] = data.results.language;

        moment.locale(data.results.language);

        yield put(push('/'))

        yield put({ type: ActionTypes.GET_USERINFO_SUCCESS, payload: data.results });
    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_USERINFO_FAILED });
    }
}

function* searchUser(action) {
    try {

        const { payload } = action;

        if (!payload) return

        const { data } = yield axiosClient.get(`/user?q=${payload}`);

        yield put({ type: ActionTypes.SEARCH_USER_SUCCESS, payload: data.results });
    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.SEARCH_USER_FAILED });
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
        apiErrorHandle(error)

        yield put({ type: ActionTypes.REGISTER_ACCOUNT_FAILED });

    }
}

function* updaterUser(action) {
    try {
        const { payload, callback } = action;

        const formData = new FormData();

        formData.append('firstName', payload.firstName)

        formData.append('lastName', payload.lastName)

        formData.append('gender', payload.gender)

        if (payload.avatar.file) {
            formData.append('avatar', payload.avatar.file)
        }

        formData.append('phone', payload.phone)

        formData.append('email', payload.email)

        formData.append('language', payload.language)

        const { data } = yield axiosClient.put('/user', formData);

        yield put({ type: ActionTypes.UPDATE_USERINFO_SUCCESS, payload: data.results });

        i18n.changeLanguage(payload.language)

        moment.locale(payload.language);

        callback();

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.UPDATE_USERINFO_FAILED });

    }
}

function* checkLogout() {

    const language = localStorage.getItem(localStorageKey.language)

    localStorage.removeItem(localStorageKey.token);

    yield put({ type: ActionTypes.LOGOUT_DONE });

    i18n.changeLanguage(language);
}

export default function* user() {
    yield takeLeading(ActionTypes.LOGIN, loginAction);
    yield takeLeading(ActionTypes.REGISTER_ACCOUNT, registerUser);
    yield takeLeading(ActionTypes.UPDATE_USERINFO, updaterUser);
    yield takeLeading(ActionTypes.CHECK_LOGIN, checkLogin);
    yield takeLeading(ActionTypes.LOGOUT, checkLogout);

    yield debounce(1000, ActionTypes.SEARCH_USER, searchUser)
}