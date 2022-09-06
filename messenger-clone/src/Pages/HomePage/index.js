import React from 'react';
import TextField from '@mui/material/TextField';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreateIcon from '@mui/icons-material/Create';

import styles from '../HomePage/style.module.css'
import i18n from '../../utils/i18n';
import { routes, newChat, FileTypes } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes'
import ChatInput from '../../components/ChatInput';
import MessageItem from '../../components/MessageItem';
import ProfileContainer from '../../components/ProfileContainer';
import SearchItem from '../../components/SearchItem';
import BadgeAvatars from '../../components/BadgeAvatars';
import SearchUserModal from '../../components/SearchUserModal';
import UpdateUserModal from '../../components/UpdateUserModal';

function HomePage() {

    const dispatch = useDispatch();

    let history = useHistory();

    const user = useSelector((state) => state.user.user)

    const conversations = useSelector((state) => state.conversations.conversations)

    const loadMore = useSelector((state) => state.conversations.loadMore)

    const searchConversations = useSelector((state) => state.conversations.searchConversation)

    const selectedConversation = useSelector((state) => state.conversations.selectedConversation)

    const messages = useSelector((state) => state.conversations.messages)

    const readMessageUsers = React.useMemo(() => {

        if (!selectedConversation) return []

        const users = selectedConversation.users.filter((item) => item._id !== user._id)

        return users.map((item) => {
            let lastMessage;

            if (messages[0]?.user === item._id || messages[0]?.user._id === item._id) {

                lastMessage = messages[0]

            } else {

                lastMessage = messages.find((messageItem) => (
                    messageItem.readUsers?.some((userItem) => userItem._id === item._id)
                ))

            }

            return { user: item, lastMessage }
        })

    }, [messages, selectedConversation, user._id])

    const conversationsLoading = useSelector((state) => state.conversations.conversationsLoading)

    const conversationIdLoading = useSelector((state) => state.conversations.conversationIdLoading)

    const messagesLoading = useSelector((state) => state.conversations.messagesLoading)

    const page = React.useRef(1)

    const lastPage = React.useRef(false)

    const callChatMessageAPI = React.useRef(false)

    const otherUsers = selectedConversation?.users.filter((userItem) => userItem._id !== user._id)

    const { id } = useParams();

    const [state, setState] = React.useState({
        searchKey: "",
        openSearchUserModal: false,
        openUpdateUserModal: false,
    })

    const onClickConversation = React.useCallback((item) => () => {
        lastPage.current = false
        page.current = 1
        callChatMessageAPI.current = false
        history.push(routes.HOME(item._id).path)
    }, [history])

    const onClickGrAdd = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, openUpdateUserModal: true }))
    }, [])

    const onClickGrCreate = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, openSearchUserModal: true }))
    }, [])

    const onCloseSearchUserModal = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, openSearchUserModal: false }))
    }, [])

    const onCloseUpdateUserModal = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, openUpdateUserModal: false }))
    }, [])

    const onClickSearchUser = React.useCallback((item) => {
        history.push(routes.HOME(newChat).path)
        dispatch({
            type: ActionTypes.GET_CONVERSATIONID_SUCCESS, payload: {
                "_id": Date.now(),
                "title": `${item.firstName} ${item.lastName}`,
                "users": [
                    user,
                    item,
                ]
            }
        })
        dispatch({ type: ActionTypes.RESET_MESSAGES })
    }, [dispatch, history, user])

    let otherUser = selectedConversation?.users.find((userItem) => userItem._id !== user._id)

    const isGroupChat = selectedConversation?.users.length > 2

    let selectedConversationTitle = [];

    if (isGroupChat) {
        selectedConversationTitle = selectedConversation?.users
            .filter((userItem) => userItem._id !== user._id)
            .map((userLastName) => userLastName.lastName)
            .join(', ')
    }

    function renderConversationItem(item) {

        const itemOtherUser = item.users.find((userItem) => userItem._id !== user._id)

        const notMyLastMessage = item.lastMessage.user._id !== user._id

        const firstUserName = item.lastMessage.user.firstName.split(' ')

        const lastOneWordName = firstUserName[firstUserName.length - 1]

        let lastMessageUsername = notMyLastMessage ? lastOneWordName : i18n.t('auth.you')

        let lastMessageText = item.lastMessage.text

        let avatar = itemOtherUser.avatar;

        const isGroupChat = item.users.length > 2;

        let unReadMessage = false

        if (item.lastMessage.user._id !== user._id) {

            unReadMessage = !item.lastMessage.readUsers?.some((userItem) => userItem._id === user._id) ?? false

        }


        let conversationTitle = ''

        if (isGroupChat) {
            avatar = item.users
                .filter((userItem) => userItem._id !== user._id)
                .map((userItem) => userItem.avatar)

            conversationTitle = item.users
                .filter((userItem) => userItem._id !== user._id)
                .map((userItem) => userItem.firstName)
                .join(', ')
        } else {
            lastMessageUsername = notMyLastMessage ? '' : i18n.t('auth.you')
        }

        if (item.lastMessage.files.length) {

            const lastFile = item.lastMessage.files[item.lastMessage.files.length - 1];

            const lastMessageFiles = item.lastMessage.files.filter((fileItem) => fileItem.type === lastFile.type)

            const i18nParam = {
                sender: lastMessageUsername,
                number: lastMessageFiles.length,
                fileType: i18n.t('auth.file')
            }

            if (lastFile.type === FileTypes.CHAT_IMAGE) {
                i18nParam.fileType = i18n.t('auth.image');
            } else if (lastFile.type === FileTypes.CHAT_VIDEO) {
                i18nParam.fileType = i18n.t('auth.video');
            }

            lastMessageText = i18n.t('auth.lastFileSend', i18nParam)

            lastMessageUsername = '';

        }

        return (
            <SearchItem
                key={item._id}
                onClick={onClickConversation(item)}
                avatar={avatar}
                title={isGroupChat ? conversationTitle : item.title}
                lastMessageUsername={lastMessageUsername}
                lastMessage={lastMessageText}
                lastMessageAt={item.lastMessage.createdAt}
                online={itemOtherUser.online}
                badgeVisible={!isGroupChat}
                lastMessageType={item.lastMessage.type}
                unReadMessage={unReadMessage}
            />
        )
    }

    function renderMessageItem(item) {

        const userByMessage = selectedConversation?.users.find((user) => user._id === item.user || user._id === item.user._id)

        const readUsers = []

        for (const userItem of readMessageUsers) {
            if (userItem.lastMessage?._id === item._id) {
                readUsers.push(userItem.user)
            }
        }

        return (
            <MessageItem
                item={item}
                user={user}
                key={item._id}
                avatar={userByMessage?.avatar}
                online={userByMessage?.online}
                readUsers={readUsers}
            />
        )
    }

    const onChange = React.useCallback((event) => {
        dispatch({ type: ActionTypes.SEARCHCONVERSATIONS, payload: event.target.value })
        setState((prevState) => ({ ...prevState, searchKey: event.target.value }))
    }, [dispatch])

    const onScrollMessage = React.useCallback((event) => {

        const scrollPosition = event.target.scrollHeight - (event.target.scrollTop * (-1))

        const isEndReached = scrollPosition <= event.target.clientHeight + 10;

        if (isEndReached && !lastPage.current) {

            callChatMessageAPI.current = true;

            dispatch({
                type: ActionTypes.GET_MESSAGES,
                payload: id,
                page: page.current + 1,
                callback: (data) => {
                    lastPage.current = data.length === 0;
                    callChatMessageAPI.current = false;
                    ++page.current
                }
            });
        }

    }, [dispatch, id])

    const sendMessage = React.useCallback((fileSend, inputMessage, type) => {
        if (id === newChat) {
            dispatch({
                type: ActionTypes.NEW_CHAT,
                payload: { text: inputMessage, files: fileSend, userId: otherUser._id, type }
            })
            return
        }
        dispatch({
            type: ActionTypes.SEND_MESSAGES,
            payload: { text: inputMessage, files: fileSend, conversationId: selectedConversation._id, type }
        })
    }, [dispatch, id, otherUser, selectedConversation?._id])

    React.useEffect(() => {

        dispatch({ type: ActionTypes.GET_CONVERSATIONS });

    }, [dispatch]);

    React.useEffect(() => {
        if (!id) return
        if (id === newChat) return
        dispatch({ type: ActionTypes.GET_CONVERSATIONID, payload: id })
        dispatch({ type: ActionTypes.GET_MESSAGES, payload: id, page: 1 })
    }, [dispatch, id]);

    React.useEffect(() => {
        if (selectedConversation && selectedConversation.lastMessage.user._id !== user._id) {
            dispatch({ type: ActionTypes.READ_MESSAGE, payload: selectedConversation.lastMessage._id })
        }
    }, [dispatch, selectedConversation, user._id])

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
                ) : (
                    <div className={styles.listConversationContainer}>
                        {(state.searchKey.length ? searchConversations : conversations).map(renderConversationItem)}
                    </div>
                )}

            </div>
            <div className={styles.messageContainer}>
                <div className={styles.messageHeaderContainer}>
                    <div className={styles.userInfor}>
                        {conversationIdLoading ? (
                            <>
                                <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 5 }} />
                                <Skeleton variant="text" width={60} height={20} />
                            </>
                        ) : (
                            <>
                                <BadgeAvatars
                                    badgeVisible={!isGroupChat}
                                    avatar={isGroupChat ? otherUsers.map((userItem) => userItem.avatar) : otherUser?.avatar}
                                    online={otherUser?.online}
                                    avatarClassName={styles.avatarClassName}
                                />
                                <div className={`${styles.selectedUserInfo}`}>
                                    <div className={`${styles.selectedConversationTitle}`}>{isGroupChat ? selectedConversationTitle : selectedConversation?.title}</div>
                                    {!isGroupChat && (
                                        <>
                                            {otherUser?.online ? (
                                                <div className={`${styles.onlineStatus}`}>{i18n.t('auth.onlineStatus')}</div>
                                            ) : (
                                                <div className={`${styles.onlineStatus}`}>{moment(otherUser?.lastLogin).fromNow()}</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <SearchUserModal open={state.openSearchUserModal} onClose={onCloseSearchUserModal} initSelectedUsers={otherUsers} />
                    <UpdateUserModal open={state.openUpdateUserModal} onClose={onCloseUpdateUserModal} initSelectedUsers={otherUsers} conversationId={id} />
                    {selectedConversation ? (
                        <div className={`${styles.backGroundIcon}`}>
                            <GroupAddIcon onClick={onClickGrAdd} color='primary' />
                        </div>
                    ) : (
                        <div className={`${styles.backGroundIcon}`}>
                            <CreateIcon onClick={onClickGrCreate} color='primary' />
                        </div>
                    )}
                </div>
                <div className={styles.listMessage} onScroll={onScrollMessage} >
                    {messagesLoading ? (
                        <Box className={styles.messagesLoading}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {selectedConversation && messages.map(renderMessageItem)}
                            {loadMore && (
                                <div className={styles.loadMore}>
                                    <CircularProgress size={24} />
                                </div>
                            )}
                        </>
                    )}
                </div>
                {id && <ChatInput onSubmit={sendMessage} />}
            </div>
            <div className={styles.profileContainer}>
                <ProfileContainer onClickSearchUser={onClickSearchUser} />
            </div>
        </div>
    )
}

export default HomePage;