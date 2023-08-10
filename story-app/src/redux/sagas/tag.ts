import * as ActionTypes from '../actionTypes'
import { takeLeading, put } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getTagsAction() {
    try {
        const { data } = yield axiosClient.get('/story/tag');

        yield put({ type: ActionTypes.GET_STORY_TAGS_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_STORY_TAGS_FAILED });
    }
}

export default function* tag() {
    yield takeLeading(ActionTypes.GET_STORY_TAGS, getTagsAction);
}