import * as ActionTypes from '../actionTypes'
import { takeLeading, put } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getCategoriesAction(action) {
    try {
        const { data } = yield axiosClient.get('/story/category');

        yield put({ type: ActionTypes.GET_CATEGORIES_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_CATEGORIES_FAILED });
    }
}

export default function* category() {
    yield takeLeading(ActionTypes.GET_CATEGORIES, getCategoriesAction);
}