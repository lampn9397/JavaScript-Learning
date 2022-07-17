import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './style.module.css'
import BadgeAvatars from '../../components/BadgeAvatars';

export default function SearchItem({
    lastMessageAtVisible: lastMessageVisible,
    onClick,
    avatar,
    title,
    lastMessageUsername,
    lastMessage,
    lastMessageAt,
    badgeVisible,
    online,
}) {

    return (
        <div className={styles.userContainer} onClick={onClick}>
            <div className={styles.avatarContainer}>
                <BadgeAvatars avatar={avatar} badgeVisible={badgeVisible} online={online} />
            </div>
            <div className={styles.userInfo}>
                <div>{title}</div>
                <div className={styles.lastMessageContainer}>
                    <div className={styles.lastMessageUsername}>{lastMessageUsername} {lastMessageUsername ? ':' : ''}</div>
                    {lastMessageVisible && (
                        <>
                            <div className={styles.lastMessage}>{lastMessage}</div>
                            <div className={styles.dotSpace}>·</div>
                            <div> {moment(lastMessageAt).fromNow()}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

SearchItem.propTypes = {
    lastMessageAtVisible: PropTypes.bool,
    onClick: PropTypes.func,
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lastMessageUsername: PropTypes.string,
    lastMessage: PropTypes.string,
    lastMessageAt: PropTypes.string,
    badgeVisible: PropTypes.bool,
    online: PropTypes.bool,
}

SearchItem.defaultProps = {
    lastMessageAtVisible: true,
    onClick: () => undefined,
    lastMessageUsername: '',
    lastMessage: '',
    lastMessageAt: '',
    badgeVisible: true,
    online: false,
}