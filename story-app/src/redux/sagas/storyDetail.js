import * as ActionTypes from '../actionTypes'
import { takeLeading, put } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getStoryDetail({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story/${payload.slug}`);

        yield put({ type: ActionTypes.GET_STORY_DETAIL_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_STORY_DETAIL_FAILED });
    }
}

export default function* StoryDetail() {
    yield takeLeading(ActionTypes.GET_STORY_DETAIL, getStoryDetail);
}