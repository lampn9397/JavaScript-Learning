import React from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useHistory, useParams } from 'react-router-dom';
import { io } from "socket.io-client";

import styles from '../HomePage/style.module.css'
import i18n from '../../utils/i18n';
import { host, routes, SocketEvents, localStorageKey } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes'
import BadgeAvatars from '../../components/BadgeAvatars';
import ChatInput from '../../components/ChatInput';
import MessageItem from '../../components/MessageItem';


function HomePage() {

    const dispatch = useDispatch();

    let history = useHistory();

    const user = useSelector((state) => state.user.user)

    const conversations = useSelector((state) => state.conversations.conversations)

    const searchConversations = useSelector((state) => state.conversations.searchConversation)

    const selectedConversation = useSelector((state) => state.conversations.selectedConversation)

    const messages = useSelector((state) => state.conversations.messages)

    const conversationsLoading = useSelector((state) => state.conversations.conversationsLoading)

    const conversationIdLoading = useSelector((state) => state.conversations.conversationIdLoading)

    const messagesLoading = useSelector((state) => state.conversations.messagesLoading)

    const { id } = useParams();

    const [state, setState] = React.useState({
        searchKey: "",
    })

    const onClickConversation = React.useCallback((item) => () => {
        history.push(routes.HOME(item._id).path)
    }, [history])

    const otherUser = selectedConversation?.users.find((userItem) => userItem._id !== user._id)

    function renderConversationItem(item) {

        const itemOtherUser = item.users.find((userItem) => userItem._id !== user._id)

        const otherConversation = item.lastMessage.user._id !== user._id

        const lastMessageUsername = otherConversation ? item.lastMessage.user.firstName : i18n.t('auth.you')

        return (
            <div className={styles.userContainer} key={item._id} onClick={onClickConversation(item)}>
                <div className={styles.avatarContainer}>
                    <BadgeAvatars avatar={itemOtherUser.avatar} />
                </div>
                <div className={styles.userInfo}>
                    <div>{item.title}</div>
                    <div className={styles.lastMessageContainer}>
                        <div className={styles.lastMessageUsername}>{lastMessageUsername} :</div>
                        <div className={styles.lastMessage}>{item.lastMessage.text}</div>
                        <div className={styles.dotSpace}>·</div>
                        <div>{moment(item.lastMessage.createdAt).fromNow()}</div>
                    </div>
                </div>
            </div>
        )
    }

    function renderMessageItem(item) {
        return (
            <MessageItem item={item} user={user} key={item._id} />
        )
    }

    const onChange = React.useCallback((event) => {
        dispatch({ type: ActionTypes.SEARCHCONVERSATIONS, payload: event.target.value })
        setState((prevState) => ({ ...prevState, searchKey: event.target.value }))
    }, [dispatch])

    const sendMessage = React.useCallback((fileSend, inputMessage) => {
        dispatch({
            type: ActionTypes.SEND_MESSAGES,
            payload: { text: inputMessage, files: fileSend, conversationId: selectedConversation._id }
        })
    }, [dispatch, selectedConversation])

    React.useEffect(() => {

        const token = localStorage.getItem(localStorageKey.token);

        const socket = io(host, { auth: { token } });

        socket.on(SocketEvents.NEW_MESSAGE, (message) => {
            dispatch({ type: ActionTypes.SEND_MESSAGES_SUCCESS, payload: message });
        })

        socket.on(SocketEvents.NEW_CONVERSATION, (conversation) => {
            dispatch({ type: ActionTypes.UPDATE_CONVERSATION, payload: conversation });
        })

        dispatch({ type: ActionTypes.GET_CONVERSATIONS });

        return () => {
            socket.off(SocketEvents.NEW_MESSAGE);
            socket.off(SocketEvents.NEW_CONVERSATION);
            socket.disconnect();
        }; //function component cleanup

    }, [dispatch]);

    React.useEffect(() => {
        if (!id) return
        dispatch({ type: ActionTypes.GET_CONVERSATIONID, payload: id })
        dispatch({ type: ActionTypes.GET_MESSAGES, payload: id })
    }, [dispatch, id]);

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.listFriendContainer}>
                {i18n.t('chat.listChat')}
                <TextField
                    id="outlined-size-small"
                    size="small"
                    value={state.searchKey}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                        className: styles.searchInput
                    }}
                    placeholder={i18n.t('chat.searchDescription')}
                />
                {conversationsLoading ? (
                    <Box sx={{ display: 'flex' }} className={styles.conversationsLoading}>
                        <CircularProgress />
                    </Box>
                ) : (state.searchKey.length ? searchConversations : conversations).map(renderConversationItem)}

            </div>
            <div className={styles.messageContainer}>
                <div className={styles.messageHeaderContainer}>
                    <div className={styles.userInfor}>
                        {conversationIdLoading ? (
                            <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 5 }} />
                        ) : (
                            <img className={styles.userSmallAvatar} src={otherUser?.avatar} alt="" />
                        )}
                        {conversationIdLoading ? (
                            <Skeleton variant="text" width={60} height={20} />
                        ) : (
                            <div>{selectedConversation?.title}</div>
                        )}
                    </div>
                </div>
                <div className={styles.listMessage}>
                    {messagesLoading ? (
                        <Box className={styles.messagesLoading}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        messages.map(renderMessageItem)
                    )}
                </div>
                <ChatInput onSubmit={sendMessage} />
            </div>
            <div className={styles.profileContainer}>
            </div>
        </div>
    )
}

export default HomePage;