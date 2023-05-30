import * as ActionTypes from '../actionTypes'
import { put, takeEvery } from 'redux-saga/effects';

import { axiosClient } from '../../constants'
import { apiErrorHandle } from '../../utils';

function* getCommentsAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/story/${payload.storyId}/comment?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_COMMENTS_SUCCESS,
            payload: {
                results: data.results,
                page: payload.page,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_COMMENTS_FAILED,
        });
    }
}
function* sendCommentsAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        if (payload.parentCommentId) {
            searchParams.set("parentCommentId", payload.parentCommentId)
        }

        if (payload.commentId) {
            searchParams.set("commentId", payload.commentId)
        }

        const { data } = yield axiosClient.post(`/story/${payload.storyId}/comment?${searchParams.toString()}`, payload);

        yield put({
            type: ActionTypes.SEND_COMMENT_SUCCESS,
            payload: {
                results: data.results,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.SEND_COMMENT_FAILED,
        });
    }
}
function* likeCommentAction({ payload }) {
    try {
        const { data } = yield axiosClient.put(`/story/comment/${payload.commentId}/like`);

        yield put({
            type: ActionTypes.LIKE_COMMENT_SUCCESS,
            payload: {
                results: data.results,
            }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.LIKE_COMMENT_FAILED,
        });
    }
}

export default function* comment() {
    yield takeEvery(ActionTypes.GET_COMMENTS, getCommentsAction);
    yield takeEvery(ActionTypes.SEND_COMMENT, sendCommentsAction);
    yield takeEvery(ActionTypes.LIKE_COMMENT, likeCommentAction);
}