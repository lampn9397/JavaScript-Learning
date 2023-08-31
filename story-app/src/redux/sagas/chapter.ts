import * as ActionTypes from '../actionTypes'
import { put, select, takeEvery } from 'redux-saga/effects';

import { axiosClient, publicRoutes } from '../../constants'
import { apiErrorHandle } from '../../utils';
import { ReduxAction } from '@/constants/types/redux';
import Swal from 'sweetalert2';
import { push } from 'connected-react-router';
import { RootState } from '../store';
import { Chapter } from '@/constants/types/chapter';

function* getChaptersAction({ payload }: ReduxAction) {
    try {
        const searchParams = new URLSearchParams()

        searchParams.set("page", payload.page)

        searchParams.set("limit", payload.limit)

        searchParams.set("sort", payload.sort)

        searchParams.set("sortType", payload.sortType)

        const { data } = yield axiosClient.get(`/story/${payload.slug}/chapter?${searchParams.toString()}`);

        yield put({
            type: ActionTypes.GET_CHAPTERS_SUCCESS,
            payload: { results: data.results, stateName: payload.stateName },
        });

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.GET_CHAPTERS_FAILED,
        });
    }
}

function* createChaptersAction({ payload }: ReduxAction) {
    try {
        const { data } = yield axiosClient.post(`/story/${payload.storyId}/chapter`, payload);

        yield put({
            type: ActionTypes.CREATE_STORY_CHAPTER_SUCCESS,
            payload: {
                results: data.results,
            }
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

        yield put({
            type: ActionTypes.CREATE_STORY_CHAPTER_FAILED,
        });
    }
}

function* updateChaptersAction({ payload }: ReduxAction) {
    try {
        const chapterDetail: Chapter = yield select((state: RootState) => state.chapterDetail.chapterDetail)

        Object.keys(payload).forEach(key => {
            if (key !== "chapterId" && key !== "storyId") {
                if (payload[key] === chapterDetail[key as keyof Chapter]) {
                    payload[key] = undefined
                }
            }
        });

        const { data } = yield axiosClient.put(`/story/${payload.storyId}/chapter/${payload.chapterId}`, payload);

        yield put({
            type: ActionTypes.UPDATE_STORY_CHAPTER_SUCCESS,
            payload: {
                results: data.results,
            }
        });

        yield Swal.fire({
            title: "Cập nhật thành công",
            icon: "success",
            confirmButtonText: "Xác nhận",
            confirmButtonColor: "#00cc44",
        })

        yield put(push(publicRoutes.StoryChapterManagementPage(payload.storyId).path))

    } catch (error) {
        apiErrorHandle(error)

        yield put({
            type: ActionTypes.UPDATE_STORY_CHAPTER_FAILED,
        });
    }
}

export default function* category() {
    yield takeEvery(ActionTypes.GET_CHAPTERS, getChaptersAction);
    yield takeEvery(ActionTypes.CREATE_STORY_CHAPTER, createChaptersAction);
    yield takeEvery(ActionTypes.UPDATE_STORY_CHAPTER, updateChaptersAction);
}