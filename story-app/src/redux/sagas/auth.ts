import * as ActionTypes from '../actionTypes'
import { put, takeLeading } from 'redux-saga/effects';

import { LocalStorageKey, axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';
import { ReduxAction } from '@/constants/types/redux';
import Swal from 'sweetalert2';

function* registerAction({ payload }: ReduxAction) {
    try {
        const { data } = yield axiosClient.post(`/user/register`, payload);

        axiosClient.defaults.headers.Authorization = `Bearer ${data.results}`;

        localStorage.setItem(LocalStorageKey.TOKEN, data.results);

        yield getUserInfo()

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.REGISTER_FAILED,
        });
    }
}

function* getUserInfo() {
    try {
        const { data } = yield axiosClient.get('/user');

        yield put({ type: ActionTypes.GET_USER_INFOR_SUCCESS, payload: data.results });
    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_USER_INFOR_FAILED });
    }
}

function* loginAction({ payload }: ReduxAction) {

    try {
        const { data } = yield axiosClient.post('/user/login', payload);

        axiosClient.defaults.headers.Authorization = `Bearer ${data.results}`;

        localStorage.setItem(LocalStorageKey.TOKEN, data.results);

        yield getUserInfo()

    } catch (error) {
        apiErrorHandle(error)
    }
}

function* checkLoginAction() {

    const token = localStorage.getItem(LocalStorageKey.TOKEN);

    if (!token) {
        yield put({ type: ActionTypes.CHECK_LOGIN_DONE });
        return;
    }
    axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

    yield getUserInfo()
}

function* checkLogoutAction() {

    localStorage.removeItem(LocalStorageKey.TOKEN);

    yield put({ type: ActionTypes.CHECK_LOG_OUT_DONE });

}

function* updateProfileAction({ payload }: ReduxAction) {
    try {
        const formData = new FormData();

        Object.keys(payload).forEach(key => {
            if (key === "avatar") {
                formData.append(key, payload[key].fileSend)
            } else {
                formData.append(key, payload[key])
            }
        });

        yield axiosClient.put(`/user`, formData);

        yield put({ type: ActionTypes.UPDATE_PROFILE_SUCCESS, payload: payload });

        Swal.fire({
            title: "Cập nhật thành công",
            icon: "success",
            confirmButtonText: "Xác nhận",
            confirmButtonColor: "#00cc44"
        })

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.UPDATE_PROFILE_FAILED, });
    }
}


export default function* auth() {
    yield takeLeading(ActionTypes.REGISTER, registerAction);
    yield takeLeading(ActionTypes.LOGIN, loginAction);
    yield takeLeading(ActionTypes.CHECK_LOGIN, checkLoginAction);
    yield takeLeading(ActionTypes.CHECK_LOG_OUT, checkLogoutAction);
    yield takeLeading(ActionTypes.UPDATE_PROFILE, updateProfileAction);
}