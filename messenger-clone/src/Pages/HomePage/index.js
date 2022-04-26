import React from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../HomePage/style.module.css'
import i18n from '../../utils/i18n';
import { listFriend } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes'

function HomePage() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user)

    function renderConversationItem(item, index) {
        const user = item.users[0]
        return (
            <div className={styles.userContainer} key={index}>
                <img src={user.avatar} className={styles.avatar} alt="" />
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

    React.useEffect(() => {
        dispatch({ type: ActionTypes.GET_USERINFO });
    }, [dispatch]);

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.listFriendContainer}>
                {i18n.t('chat.listChat')}
                <TextField
                    id="outlined-size-small"
                    size="small"
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
                {listFriend.map(renderConversationItem)}
            </div>
            <div className={styles.messageContainer}>
                <div className={styles.messageHeaderContainer}>
                    <div className={styles.userInfor}>
                        <img className={styles.userSmallAvatar} src={user.avatar} alt="" />
                        <div>{user.firstName} {user.lastName}</div>
                    </div>
                </div>
                <div className={styles.space} />
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '0px',
                        },
                    }}
                    id="outlined-size-small"
                    size="small"
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
            </div>
            <div className={styles.profileContainer}>
            </div>
        </div>
    )
}

export default HomePage;