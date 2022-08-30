import { all, fork } from 'redux-saga/effects';

import user from './user'
import chat from './chat'
import socket from './socket'

export default function* rootSaga() {
    yield all([
        fork(user),
        fork(chat),
        fork(socket),
    ]);
}