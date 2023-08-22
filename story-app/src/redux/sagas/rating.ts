import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';
import { ReduxAction } from '@/constants/types/redux';
import { notification } from 'antd';

function* getRatingsAction({ payload }: ReduxAction) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/story/${payload.storyId}/rating?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_RATINGS_SUCCESS,
            payload: {
                results: data.results,
                page: payload.page,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_RATINGS_FAILED,
        });
    }
}

function* createRatingsAction({ payload }: ReduxAction) {
    try {
        const { data } = yield axiosClient.post(`/story/${payload.storyId}/rating`, payload);

        const success = true

        payload.callback(success) //tat modal

        notification.success({
            message: 'Gửi Đánh Giá Thành Công',
        });

        yield put({
            type: ActionTypes.RATING_STORY_SUCCESS,
            payload: {
                results: data.results,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.RATING_STORY_FAILED,
        });
    }
}

function* likeRatingAction({ payload }: ReduxAction) {
    try {
        const { data } = yield axiosClient.put(`/story/rating/${payload.ratingId}/like`);

        yield put({
            type: ActionTypes.LIKE_RATING_SUCCESS,
            payload: {
                results: data.results,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.LIKE_RATING_FAILED,
        });
    }
}

export default function* Rating() {
    yield takeEvery(ActionTypes.GET_RATINGS, getRatingsAction);
    yield takeEvery(ActionTypes.RATING_STORY, createRatingsAction);
    yield takeEvery(ActionTypes.LIKE_RATING, likeRatingAction);
}