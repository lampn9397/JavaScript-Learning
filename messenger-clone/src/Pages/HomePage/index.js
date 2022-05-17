import React from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import styles from '../HomePage/style.module.css'
import i18n from '../../utils/i18n';
import { routes } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes'
import BadgeAvatars from '../../components/BadgeAvatars';
import { useHistory } from 'react-router-dom';

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

    const [state, setState] = React.useState({
        searchKey: "",
        inputMessage: "",
    })

    const onClickConversation = React.useCallback((item) => () => {
        history.push(routes.HOME(item._id).path)
        dispatch({ type: ActionTypes.GET_CONVERSATIONID, payload: item._id })
        dispatch({ type: ActionTypes.GET_MESSAGES, payload: item._id })
    }, [dispatch, history])

    const otherUser = selectedConversation?.users.find((userItem) => userItem._id !== user._id)

    function renderConversationItem(item) {

        const itemOtherUser = item.users.find((userItem) => userItem._id !== user._id)

        return (
            <div className={styles.userContainer} key={item._id} onClick={onClickConversation(item)}>
                <div className={styles.avatarContainer}>
                    <BadgeAvatars avatar={itemOtherUser.avatar} />
                </div>
                <div className={styles.userInfo}>
                    <div>{item.title}</div>
                    <div className={styles.lastMessageContainer}>
                        <div className={styles.lastMessage}>{item.lastMessage.text}</div>
                        <div className={styles.dotSpace}>·</div>
                        <div>{moment(item.lastMessage.createdAt).fromNow()}</div>
                    </div>
                </div>
            </div>
        )
    }

    function renderMessageItem(item) {

        if (item.user !== user._id) {
            return (
                <div className={styles.otherMessageContainer} key={item._id}>
                    <div className={styles.otherMessages}>{item.text}</div>
                </div>
            )
        }

        return (
            <div className={styles.myMessageContainer} key={item._id}>
                <div className={styles.myMessages}>{item.text}</div>
            </div>
        )
    }

    const onChange = React.useCallback((event) => {
        dispatch({ type: ActionTypes.SEARCHCONVERSATIONS, payload: event.target.value })
        setState((prevState) => ({ ...prevState, searchKey: event.target.value }))
    }, [dispatch])

    const onChangeInputMessage = React.useCallback((event) => {
        setState((prevState) => ({ ...prevState, inputMessage: event.target.value }))
    }, [])

    const onKeyDownInputMessage = React.useCallback((event) => {
        if (event.key === "Enter") {
            setState((prevState) => ({ ...prevState, inputMessage: "" }))
            dispatch({
                type: ActionTypes.SEND_MESSAGES,
                payload: { text: state.inputMessage, conversationId: selectedConversation._id }
            })
        }
    }, [dispatch, selectedConversation, state.inputMessage])

    const onClickSendMessage = React.useCallback((event) => {
        setState((prevState) => ({ ...prevState, inputMessage: "" }))
        dispatch({
            type: ActionTypes.SEND_MESSAGES,
            payload: { text: state.inputMessage, conversationId: selectedConversation._id }
        })
    }, [dispatch, selectedConversation, state.inputMessage])

    React.useEffect(() => {
        dispatch({ type: ActionTypes.GET_CONVERSATIONS });
    }, [dispatch]);

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
                            <div>{otherUser?.firstName} {otherUser?.lastName}</div>
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
                <div className={styles.chatUltils}>
                    <AttachFileIcon color='primary' />
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: '0px',
                            },
                        }}
                        id="outlined-size-small"
                        size="small"
                        InputProps={{
                            className: styles.searchInput
                        }}
                        placeholder="Aa"
                        value={state.inputMessage}
                        onChange={onChangeInputMessage}
                        onKeyDown={onKeyDownInputMessage}
                        className={styles.inputMessageContainer}
                    />
                    {state.inputMessage ? (
                        <SendIcon color='primary' sx={{ marginRight: '5px' }} onClick={onClickSendMessage} />
                    ) : (
                        <ThumbUpIcon color='primary' sx={{ marginRight: '5px' }} />
                    )}
                </div>
            </div>
            <div className={styles.profileContainer}>
            </div>
        </div>
    )
}

export default HomePage;