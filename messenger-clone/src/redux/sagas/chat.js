import * as ActionTypes from '../actionTypes'
import { takeLeading, put, select, debounce } from 'redux-saga/effects';

import { axiosClient, routes } from '../../constants'
import { push } from 'connected-react-router';

function* getConversationsAction() {
    try {
        const { data } = yield axiosClient.get('/chat');

        yield put({ type: ActionTypes.GET_CONVERSATIONS_SUCCESS, payload: data.results });

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_CONVERSATIONS_FAILED });

        alert(errorMessage);
    }
}

function* searchConversationsAction(action) {
    try {

        const { payload } = action;

        if (!action.payload) return

        const { data } = yield axiosClient.get(`/chat/?q=${payload}`);

        yield put({ type: ActionTypes.SEARCHCONVERSATIONS_SUCCESS, payload: data.results });

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.SEARCHCONVERSATIONS_FAILED });

        alert(errorMessage);
    }
}

function* getConversationIdAction(action) {
    try {

        const conversations = yield select((state) => state.conversations.conversations)

        const { payload } = action;

        const conversation = conversations.find((conversation) => conversation._id === payload)

        if (!conversation) {
            const { data } = yield axiosClient.get(`/chat/${payload}`);

            yield put({ type: ActionTypes.GET_CONVERSATIONID_SUCCESS, payload: data.results });
        } else {
            yield put({ type: ActionTypes.GET_CONVERSATIONID_SUCCESS, payload: conversation })
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_CONVERSATIONID_FAILED });

        alert(errorMessage);
    }
}
function* getMessageAction(action) {
    try {

        const { payload } = action;

        const { data } = yield axiosClient.get(`/chat/${payload}/message`);

        yield put({ type: ActionTypes.GET_MESSAGES_SUCCESS, payload: data.results });

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.GET_MESSAGES_FAILED });

        alert(errorMessage);
    }
}

function* sendMessageAction(action) {
    try {

        const { payload } = action;

        const formData = new FormData();

        formData.append('text', payload.text)

        for (let index = 0; index < payload.files.length; index++) {
            formData.append('files', payload.files[index])
        }

        yield axiosClient.post(`/chat/${payload.conversationId}/message`, formData);

        // yield put({ type: ActionTypes.SEND_MESSAGES_SUCCESS, payload: data.results });

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.SEND_MESSAGES_FAILED });

        alert(errorMessage);
    }
}
function* newChatAction(action) {
    try {

        const { payload } = action;

        const formData = new FormData();

        formData.append('text', payload.text)

        for (let index = 0; index < payload.files.length; index++) {
            formData.append('files', payload.files[index])
        }

        formData.append('receiver', payload.userId)

        const { data } = yield axiosClient.post('/chat', formData);

        yield put(push(routes.HOME(data.results._id).path))

        yield put({ type: ActionTypes.NEW_CHAT_SUCCESS, payload: data.results })

    } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.message;

        yield put({ type: ActionTypes.NEW_CHAT_FAILED });

        alert(errorMessage);
    }
}

export default function* chat() {
    yield takeLeading(ActionTypes.GET_CONVERSATIONS, getConversationsAction);
    yield takeLeading(ActionTypes.GET_CONVERSATIONID, getConversationIdAction);
    yield takeLeading(ActionTypes.GET_MESSAGES, getMessageAction);
    yield takeLeading(ActionTypes.SEND_MESSAGES, sendMessageAction);
    yield takeLeading(ActionTypes.NEW_CHAT, newChatAction);

    yield debounce(1000, ActionTypes.SEARCHCONVERSATIONS, searchConversationsAction)
}
