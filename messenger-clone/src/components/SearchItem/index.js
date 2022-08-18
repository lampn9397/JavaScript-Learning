import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { messageTypes } from '../../constants';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import classNames from 'classnames';

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
    addUserEnable,
    onClickAddIcon,
    checkItemSelected,
    lastMessageType,
}) {
    return (
        <div className={styles.userContainer} onClick={onClick}>
            <div className={styles.avatarContainer}>
                <BadgeAvatars avatar={avatar} badgeVisible={badgeVisible} online={online} />
            </div>
            <div className={classNames({
                [styles.userInfo]: true,
                [styles.userInfoWithIcon]: addUserEnable,
            })}>
                <div className={`${styles.conversationTitle}`}>{title}</div>
                <div className={styles.lastMessageContainer}>
                    <div className={styles.lastMessageUsername}>{lastMessageUsername}</div>
                    {lastMessageUsername && <div>:&nbsp;</div>}
                    {lastMessageVisible && (
                        <>
                            {lastMessageType === messageTypes.LIKE ? (
                                <ThumbUpIcon color='primary' fontSize='small' />
                            ) : (
                                <div className={styles.lastMessage}>{lastMessage}</div>
                            )}
                            <div className={styles.dotSpace}>·</div>
                            <div className={`${styles.lastMessageAt}`}> {moment(lastMessageAt).fromNow()}</div>
                        </>
                    )}
                </div>
            </div>
            {addUserEnable && (
                <>
                    {checkItemSelected ? (
                        <div className={`${styles.iconHover}`}>
                            <DoneIcon onClick={onClickAddIcon} color='primary' />
                        </div>
                    ) : (
                        <div className={`${styles.iconHover}`}>
                            <AddIcon onClick={onClickAddIcon} color='primary' />
                        </div>
                    )}
                </>
            )
            }
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
    addUserEnable: PropTypes.bool,
    onClickAddIcon: PropTypes.func,
    checkItemSelected: PropTypes.bool,
}

SearchItem.defaultProps = {
    lastMessageAtVisible: true,
    onClick: () => undefined,
    lastMessageUsername: '',
    lastMessage: '',
    lastMessageAt: '',
    badgeVisible: true,
    online: false,
    addUserEnable: false,
    onClickAddIcon: () => undefined,
    checkItemSelected: false,
}