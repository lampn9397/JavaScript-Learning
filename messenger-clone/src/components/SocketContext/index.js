import React from 'react';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';

import i18n from '../../utils/i18n';
import { host, SocketEvents, localStorageKey, reactApp, socket } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes'
import audios from '../../assets/audio';

export default function SocketContext() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user)

    const audio = React.useRef(new Audio(audios.messageNofication))

    React.useEffect(() => {

        const token = localStorage.getItem(localStorageKey.token);

        // const socket = io(host, { auth: { token } });

        socket.auth = { token }

        socket.connect()

        socket.on(SocketEvents.NEW_MESSAGE, (message) => {
            dispatch({ type: ActionTypes.SEND_MESSAGES_SUCCESS, payload: message });
            if (message.user._id !== user._id) {
                window.timerId = setInterval(() => {
                    const newSender = message.user.firstName
                    const newSenderArray = newSender.split(' ')
                    const newSenderName = newSenderArray[newSenderArray.length - 1]
                    const senderTitle = `${newSenderName} ${i18n.t('auth.sent')}`
                    document.title = document.title === senderTitle ? reactApp : senderTitle
                }, 1000)
                audio.current.play()
            }
        })

        socket.on(SocketEvents.READ_MESSAGE, (message) => {
            console.log(message)
        })

        socket.on(SocketEvents.NEW_CONVERSATION, (conversation) => {
            dispatch({ type: ActionTypes.UPDATE_CONVERSATION, payload: conversation });
        })

        return () => {
            socket.off(SocketEvents.NEW_MESSAGE);
            socket.off(SocketEvents.NEW_CONVERSATION);
            socket.disconnect();
        }

    }, [dispatch, user._id])

    return null
}