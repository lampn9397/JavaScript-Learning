import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';
import { ReduxAction } from '@/constants/types/redux';

function* getAuthorAction({ payload }: ReduxAction) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("name", payload.name)

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/author?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_AUTHORS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_AUTHORS_FAILED,
        });
    }
}

function* getAuthorDetailAction({ payload }: ReduxAction) {
    try {
        const { data } = yield axiosClient.get(`/author/${payload.id}`);

        yield put({
            type: ActionTypes.GET_AUTHOR_DETAIL_SUCCESS,
            payload: data,
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_AUTHOR_DETAIL_FAILED,
        });
    }
}

function* getMyStoryAuthorAction({ payload }: ReduxAction) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/author/my-story-authors?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_MY_STORY_AUTHORS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_MY_STORY_AUTHORS_FAILED,
        });
    }
}

export default function* author() {
    yield takeEvery(ActionTypes.GET_AUTHORS, getAuthorAction);
    yield takeEvery(ActionTypes.GET_AUTHOR_DETAIL, getAuthorDetailAction);
    yield takeEvery(ActionTypes.GET_MY_STORY_AUTHORS, getMyStoryAuthorAction);
}