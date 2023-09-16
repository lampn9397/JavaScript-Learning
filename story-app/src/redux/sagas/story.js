import * as ActionTypes from '../actionTypes'
import { put, takeEvery, takeLeading } from 'redux-saga/effects';

import { axiosClient, publicRoutes } from '../../constants'
import { apiErrorHandle } from '../../utils';
import Swal from 'sweetalert2';
import { push } from 'connected-react-router';

function* getStoriesAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        Object.keys(payload).forEach((key) => {
            if (payload[key]) {
                searchParams.set(key, payload[key])
            }
        })

        const { data } = yield axiosClient.get(`/story?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_STORIES_SUCCESS,
            payload: { results: data.results, stateName: payload.stateName }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_STORIES_FAILED,
            payload: { stateName: payload.stateName }
        });
    }
}

function* getStoryByAuthorAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        searchParams.set("sort", payload.sort)

        searchParams.set("excludeStory", payload.storySlug)

        const { data } = yield axiosClient.get(`/author/${payload.authorId}/story?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_STORY_BY_AUTHOR_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_STORY_BY_AUTHOR_FAILED, });
    }
}

function* likeStoryAction({ payload }) {
    try {
        const { data } = yield axiosClient.post(`/story/${payload.storyId}/like`);

        yield put({
            type: ActionTypes.LIKE_STORY_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.LIKE_STORY_FAILED, });
    }
}

function* getLikeStoryStatusAction({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story/${payload.storyId}/like`);

        yield put({
            type: ActionTypes.GET_LIKE_STORY_STATUS_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_LIKE_STORY_STATUS_FAILED, });
    }
}
function* followStoryAction({ payload }) {
    try {
        const { data } = yield axiosClient.post(`/story/${payload.storyId}/follow`);

        yield put({
            type: ActionTypes.FOLLOW_STORY_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.FOLLOW_STORY_FAILED, });
    }
}

function* getfollowStoryStatusAction({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story/${payload.storyId}/follow`);

        yield put({
            type: ActionTypes.GET_FOLLOW_STORY_STATUS_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_FOLLOW_STORY_STATUS_FAILED, });
    }
}

function* getUserStoryListAction({ payload }) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        const { data } = yield axiosClient.get(`/user/${payload.storyId}/story?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_USER_STORY_LIST_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_USER_STORY_LIST_FAILED, });
    }
}

function* getMyFollowStoryAction() {
    try {
        const { data } = yield axiosClient.get(`/user/story/follow`);

        yield put({
            type: ActionTypes.GET_MY_FOLLOW_STORY_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_MY_FOLLOW_STORY_FAILED, });
    }
}

function* getMyLikedStoryAction() {
    try {
        const { data } = yield axiosClient.get(`/user/story/like`);

        yield put({
            type: ActionTypes.GET_MY_LIKED_STORY_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_MY_LIKED_STORY_FAILED, });
    }
}

function* getStoryGenreAction({ payload }) {
    try {
        const { data } = yield axiosClient.get(`/story/genre`);

        yield put({
            type: ActionTypes.GET_STORY_GENRE_SUCCESS,
            payload: { results: data.results }
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_STORY_GENRE_FAILED, });
    }
}

function* createStoryAction({ payload }) {
    try {
        const formData = new FormData();

        Object.keys(payload).forEach(key => {
            if (payload[key] instanceof Array) {
                payload[key].forEach(item => {
                    formData.append(key, item)
                })
            } else {
                formData.append(key, payload[key])
            }
        });

        const { data } = yield axiosClient.post(`/story`, formData);

        yield put({
            type: ActionTypes.CREATE_STORY_SUCCESS,
            payload: { results: data.results }
        });

        yield Swal.fire({
            title: "Cập nhật thành công",
            icon: "success",
            confirmButtonText: "Xác nhận",
            confirmButtonColor: "#00cc44",
        })

        yield put(push(publicRoutes.MyStoryManagementPage().path))

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.CREATE_STORY_FAILED, });
    }
}
function* updateStoryAction({ payload }) {
    try {
        const formData = new FormData();

        Object.keys(payload).forEach(key => {
            if (payload[key] instanceof Array) {
                payload[key].forEach(item => {
                    formData.append(key, item)
                })
            } else {
                formData.append(key, payload[key])
            }
        });

        const { data } = yield axiosClient.put(`/story/${payload.storyId}`, formData);

        yield put({
            type: ActionTypes.UPDATE_STORY_SUCCESS,
            payload: { results: data.results }
        });

        yield Swal.fire({
            title: "Cập nhật thành công",
            icon: "success",
            confirmButtonText: "Xác nhận",
            confirmButtonColor: "#00cc44",
        })

        yield put(push(publicRoutes.MyStoryManagementPage().path))

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.UPDATE_STORY_FAILED, });
    }
}

export default function* category() {
    yield takeEvery(ActionTypes.GET_STORIES, getStoriesAction);
    yield takeEvery(ActionTypes.GET_STORY_BY_AUTHOR, getStoryByAuthorAction);
    yield takeEvery(ActionTypes.LIKE_STORY, likeStoryAction);
    yield takeEvery(ActionTypes.GET_LIKE_STORY_STATUS, getLikeStoryStatusAction);
    yield takeEvery(ActionTypes.FOLLOW_STORY, followStoryAction);
    yield takeEvery(ActionTypes.GET_FOLLOW_STORY_STATUS, getfollowStoryStatusAction);
    yield takeEvery(ActionTypes.GET_USER_STORY_LIST, getUserStoryListAction);
    yield takeEvery(ActionTypes.GET_MY_FOLLOW_STORY, getMyFollowStoryAction);
    yield takeEvery(ActionTypes.GET_MY_LIKED_STORY, getMyLikedStoryAction);
    yield takeEvery(ActionTypes.GET_STORY_GENRE, getStoryGenreAction);
    yield takeLeading(ActionTypes.CREATE_STORY, createStoryAction);
    yield takeLeading(ActionTypes.UPDATE_STORY, updateStoryAction);
}