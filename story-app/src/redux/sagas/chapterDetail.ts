import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';
import { ReduxAction } from '@/constants/types/redux';

function* getChapterDetailAction({ payload }: ReduxAction) {
    try {

        const { data } = yield axiosClient.get(`/story/${payload.slug}/chapter/${payload.chapterNumber}`);

        yield put({
            type: ActionTypes.GET_CHAPTER_DETAIL_SUCCESS,
            payload: data,
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_CHAPTER_DETAIL_FAILED,
        });
    }
}

export default function* chapterDetail() {
    yield takeEvery(ActionTypes.GET_CHAPTER_DETAIL, getChapterDetailAction);
}