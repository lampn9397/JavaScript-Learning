import * as ActionTypes from '../actionTypes'
import { takeLeading } from 'redux-saga/effects';
import { SocketEvents, socket } from '../../constants'

function readMessage(action) {

    const { payload } = action

    socket.emit(SocketEvents.READ_MESSAGE, payload);
}

export default function* socketSaga() {
    yield takeLeading(ActionTypes.READ_MESSAGE, readMessage);
}