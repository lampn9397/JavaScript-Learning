import React from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';

import styles from '../HomePage/style.module.css'
import i18n from '../../utils/i18n';
import { listFriend } from '../../constants';

function HomePage() {
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

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.listFriendContainer}>
                {i18n.t('chat.listChat')}
                <TextField
                    className={styles.searchInput}
                    id="outlined-size-small"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                    placeholder={i18n.t('chat.searchDescription')}
                />
                {listFriend.map(renderConversationItem)}
            </div>
            <div className={styles.messageContainer}>
                <div className={styles.messageHeaderContainer}>aaaaaaaa</div>
            </div>
            <div className={styles.profileContainer}>333333</div>
        </div>
    )
}

export default HomePage;