import * as React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PropTypes from 'prop-types';

import styles from './style.module.css'
import { FileTypes, fullScreenImageRef, messageTypes } from '../../constants';
import BadgeAvatars from '../BadgeAvatars';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';

export default function MessageItem({
    item: message,
    user,
    avatar,
    online,
    readUsers,
}) {

    const onClickImage = React.useCallback((item) => () => {
        fullScreenImageRef.current.show(item, message.files)

    }, [message.files])

    const renderReadUsers = React.useCallback(() => {
        return (
            <div className={`${styles.readUserAvatarContainer}`}>
                {readUsers?.map((item, index) => (
                    <img src={item.avatar} key={index} className={`${styles.readUserAvatar}`} alt='' />
                ))}
            </div>
        )
    }, [readUsers])

    const renderItemFile = React.useCallback(() => {
        return (
            <div>
                {message.files.map((item, index) => {
                    if (item.type === FileTypes.CHAT_IMAGE) {
                        return (
                            <React.Fragment key={index}>
                                <img className={styles.imgFile} src={item.url} alt='' onClick={onClickImage(item)} />
                                {(index + 1) % 3 === 0 && <br />}
                            </React.Fragment>
                        )
                    }

                    if (item.type === FileTypes.CHAT_VIDEO) {
                        return (
                            <React.Fragment key={index}>
                                <br />
                                <video width="320" height="240" controls className={styles.video}>
                                    <source src={item.url} type="video/mp4" />
                                </video>
                                <br />
                            </React.Fragment>
                        )
                    }

                    return (
                        <a href={item.url} className={styles.otherFileContainer} key={index}>
                            <div className={styles.filesIcon} >
                                <ArticleIcon />
                            </div>
                            <div className={styles.filesDescription}>{item.name}</div>
                        </a>
                    )
                })}
            </div>
        )
    }, [onClickImage, message.files])

    if (message.user === user._id || message.user._id === user._id) {
        return (
            <div className={styles.myMessageWrapper}>
                <EmojiEmotions />
                <div className={styles.myMessageContainer} >
                    {message.type === messageTypes.LIKE ? (
                        <div className={styles.iconContainer}>
                            <ThumbUpIcon color='primary' fontSize='large' />
                            {renderReadUsers()}
                        </div>
                    ) : (
                        <>
                            {message.text !== '' && <div className={`${styles.message} ${styles.myMessagesColor}`}>{message.text}</div>}
                            {renderItemFile()}
                            {renderReadUsers()}
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.otherMessageContainer} >
            {message.type === messageTypes.LIKE ? (
                <div className={styles.iconContainer}>
                    <ThumbUpIcon color='primary' />
                </div>
            ) : (
                <>
                    <div className={`${styles.messageWithAvatar}`}>
                        <div style={{ marginRight: 5 }}>
                            <BadgeAvatars badgeVisible={true} avatarClassName={`${styles.avatar}`} avatar={avatar} online={online} />
                        </div>
                        {message.text !== '' && <div className={`${styles.message} ${styles.otherMessagesColor}`}>{message.text}</div>}
                        {renderItemFile()}
                    </div>
                    <div className={`${styles.otherReadUsersContainer}`}>
                        {renderReadUsers()}
                    </div>
                </>
            )}
        </div>
    )

}

MessageItem.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    user: PropTypes.instanceOf(Object).isRequired,
    avatar: PropTypes.string.isRequired,
    online: PropTypes.bool,
    readUsers: PropTypes.instanceOf(Array),
}

MessageItem.defaultProps = {
    online: false,
    readUsers: [],
}