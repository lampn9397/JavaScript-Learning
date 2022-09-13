import * as ActionTypes from '../actionTypes'
import { takeLeading, put, select, debounce, delay } from 'redux-saga/effects';

import { axiosClient, routes } from '../../constants'
import { push } from 'connected-react-router';
import { apiErrorHandle } from '../../utils';

function* getConversationsAction() {
    try {
        const { data } = yield axiosClient.get('/chat');

        yield put({ type: ActionTypes.GET_CONVERSATIONS_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_CONVERSATIONS_FAILED });

    }
}

function* searchConversationsAction(action) {
    try {

        const { payload } = action;

        if (!action.payload) return

        const { data } = yield axiosClient.get(`/chat/?q=${payload}`);

        yield put({ type: ActionTypes.SEARCHCONVERSATIONS_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.SEARCHCONVERSATIONS_FAILED });

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
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_CONVERSATIONID_FAILED });

    }
}
function* getMessageAction(action) {
    const { payload, page, callback } = action;
    let messages = []
    try {
        const { data } = yield axiosClient.get(`/chat/${payload}/message?page=${page}&limit=${15}`);

        messages = data.results

        if (page > 1) yield delay(1000)

        yield put({ type: ActionTypes.GET_MESSAGES_SUCCESS, payload: data.results, page });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.GET_MESSAGES_FAILED });

    }
    callback?.(messages);
}

function* sendMessageAction(action) {
    try {

        const { payload } = action;

        if (payload.type) {
            const formData = new FormData();

            formData.append('type', payload.type)

            yield axiosClient.post(`/chat/${payload.conversationId}/message`, formData);

            return
        }

        if (payload.text) {
            const formData = new FormData();

            formData.append('text', payload.text)

            yield axiosClient.post(`/chat/${payload.conversationId}/message`, formData);
        }

        if (payload.files.length) {

            const imgFormData = new FormData();

            const otherFiles = [];

            for (let index = 0; index < payload.files.length; index++) {
                if (payload.files[index].type.startsWith('image/')) {
                    imgFormData.append('files', payload.files[index])
                } else {
                    otherFiles.push(payload.files[index])
                }
            }
            if (imgFormData.get('files')) {
                yield axiosClient.post(`/chat/${payload.conversationId}/message`, imgFormData);
            }
            for (let index = 0; index < otherFiles.length; index++) {
                const formData = new FormData();

                formData.append('files', otherFiles[index])

                yield axiosClient.post(`/chat/${payload.conversationId}/message`, formData);
            }
        }

        // yield put({ type: ActionTypes.SEND_MESSAGES_SUCCESS, payload: data.results });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.SEND_MESSAGES_FAILED });

    }
}

function* createGroupChat(action) {
    try {

        const { payload } = action;

        const formData = new FormData();

        formData.append('text', payload.text);

        for (let index = 0; index < payload.selectedUsers.length; index++) {
            formData.append('receiver', payload.selectedUsers[index]._id);
        }

        yield axiosClient.post('/chat', formData);

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.CREATE_CONVERSATIONS_FAILED });

    }
}
function* updateGroupChat(action) {
    try {

        const idConversation = yield select((state) => state.conversations.selectedConversation._id)

        const { payload } = action;

        yield axiosClient.put(`/chat/${idConversation}`, { users: payload.users });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.UPDATE_GROUPCHAT_FAILED });

    }
}
function* updateReaction(action) {
    try {

        const { payload } = action;

        yield axiosClient.put(`/chat/message/${payload.messageId}`, { reaction: payload.reaction });

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.UPDATE_REACTION_FAIL });

    }
}

function* newChatAction(action) {
    try {

        const { payload } = action;

        const formData = new FormData();

        formData.append('text', payload.text)

        if (payload.type) formData.append('type', payload.type)

        for (let index = 0; index < payload.files.length; index++) {
            formData.append('files', payload.files[index])
        }

        formData.append('receiver', payload.userId)

        const { data } = yield axiosClient.post('/chat', formData);

        yield put(push(routes.HOME(data.results._id).path))

        yield put({ type: ActionTypes.NEW_CHAT_SUCCESS, payload: data.results })

    } catch (error) {
        apiErrorHandle(error)

        yield put({ type: ActionTypes.NEW_CHAT_FAILED });
    }
}

export default function* chat() {
    yield takeLeading(ActionTypes.GET_CONVERSATIONS, getConversationsAction);
    yield takeLeading(ActionTypes.GET_CONVERSATIONID, getConversationIdAction);
    yield takeLeading(ActionTypes.GET_MESSAGES, getMessageAction);
    yield takeLeading(ActionTypes.SEND_MESSAGES, sendMessageAction);
    yield takeLeading(ActionTypes.NEW_CHAT, newChatAction);
    yield takeLeading(ActionTypes.CREATE_CONVERSATIONS, createGroupChat);
    yield takeLeading(ActionTypes.UPDATE_GROUPCHAT, updateGroupChat);
    yield takeLeading(ActionTypes.UPDATE_REACTION, updateReaction);

    yield debounce(1000, ActionTypes.SEARCHCONVERSATIONS, searchConversationsAction)
}
