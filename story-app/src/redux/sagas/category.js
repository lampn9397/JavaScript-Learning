import * as ActionTypes from '../actionTypes'
import { takeLeading, put } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getCategoriesAction() {
    try {
        const { data } = yield axiosClient.get('/story/category');

        yield put({ type: ActionTypes.GET_CATEGORIES_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_CATEGORIES_FAILED });
    }
}
function* getTopFiveStoriesAction() {
    try {
        const { data } = yield axiosClient.get('/story?page=1&limit=5&sort=totalViews');

        yield put({ type: ActionTypes.GET_TOPFIVESTORY_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_TOPFIVESTORY_FAILED });
    }
}

export default function* category() {
    yield takeLeading(ActionTypes.GET_CATEGORIES, getCategoriesAction);
    yield takeLeading(ActionTypes.GET_TOPFIVESTORY, getTopFiveStoriesAction);
}