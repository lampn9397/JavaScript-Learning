import * as React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.module.css'
import { FileTypes, fullScreenImageRef, messageTypes } from '../../constants';
import BadgeAvatars from '../BadgeAvatars';
import MessageItemReaction from '../MessageItemReaction';
import { REACTION_TYPES } from '../../constants';
import images from '../../assets';

export default function MessageItem({
    item: message,
    user,
    avatar,
    online,
    readUsers,
    onReaction,
    onClickShowPopUp,
    reactionPopUpVisible,
    reactions
}) {

    const isMyMessage = message.user === user._id || message.user._id === user._id

    const reactionList = React.useMemo(() => {
        const reactionListValue = [];

        if (!reactions) return []

        for (const reactionItem of reactions) {
            const reactionIndex = reactionListValue.findIndex((item) => item.type === reactionItem.type)

            if (reactionIndex === -1) {
                reactionListValue.push({ type: reactionItem.type, users: [reactionItem.user] })
            } else {
                reactionListValue[reactionIndex].users.push(reactionItem.user)
            }
        }
        return reactionListValue
    }, [reactions])

    const onClickImage = React.useCallback((item) => () => {
        fullScreenImageRef.current.show(item, message.files)

    }, [message.files])

    const renderReadUsers = React.useCallback(() => {
        if (!readUsers?.length) return null
        return (
            <div className={classNames({
                [styles.readUserAvatarContainer]: true,
                [styles.readUserAvatarContainerMargin]: reactionList.length,

            })}>
                {readUsers?.map((item, index) => (
                    <img src={item.avatar} key={index} className={`${styles.readUserAvatar}`} alt='' />
                ))}
            </div>
        )
    }, [reactionList.length, readUsers])

    const listMessageReactions = React.useCallback(() => {
        if (reactionList.length === 0) return null;
        return (
            <div className={
                styles.messageReactions}>
                {reactionList.map((item, index) => (
                    <img src={images[item.type.toLowerCase()]} alt='' className={`${styles.reactions}`} key={index} />
                ))}
            </div>
        )
    }, [reactionList])

    const renderItemFile = React.useCallback(() => {
        if (!message.files.length) return null;
        return (
            <div className={classNames({
                [styles.fileContainer]: true,
                [styles.myMessageFileContainer]: isMyMessage,
                [styles.otherMessageFileRelative]: !isMyMessage,
            })}>
                {!isMyMessage && listMessageReactions()}
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
    }, [isMyMessage, listMessageReactions, message.files, onClickImage])

    if (isMyMessage) {
        return (
            <div className={classNames({
                [styles.myMessageWrapper]: true,
                [styles.reactionMargin]: reactionList.length,
            })}>
                <div className={classNames({
                    [styles.myMessageItemFileContainer]: true,
                    [styles.setRelative]: message.files.length,
                })}>
                    <div className={classNames({
                        [styles.myMessageContainer]: true,
                        [styles.unSetRelative]: message.files.length,
                    })} >
                        <MessageItemReaction
                            className={styles.messageItemReaction}
                            popUpClassName={styles.myMessagePopUp}
                            onReaction={onReaction}
                            onClickShowPopUp={onClickShowPopUp}
                            reactionPopUpVisible={reactionPopUpVisible}
                        />
                        {message.type === messageTypes.LIKE ? (
                            <div className={styles.iconContainer}>
                                <ThumbUpIcon color='primary' fontSize='large' />
                            </div>
                        ) : (
                            <>
                                {message.text && <div className={`${styles.message} ${styles.myMessagesColor}`}>{message.text}</div>}
                                {listMessageReactions()}
                            </>
                        )}
                    </div>
                    {renderItemFile()}
                </div>
                {renderReadUsers()}
            </div>
        )
    }

    return (
        <div className={styles.otherMessageContainer} >
            <div className={classNames({
                [styles.otherMessageWrapper]: true,
                [styles.reactionMargin]: reactionList.length,
            })}>
                {message.type === messageTypes.LIKE ? (
                    <div className={styles.iconContainer}>
                        <ThumbUpIcon color='primary' className={styles.icon} />
                        <MessageItemReaction
                            className={styles.messageItemReaction}
                            popUpClassName={styles.otherMessagePopUp}
                            onReaction={onReaction}
                            onClickShowPopUp={onClickShowPopUp}
                            reactionPopUpVisible={reactionPopUpVisible}
                        />
                    </div>
                ) : (
                    <>
                        <div className={`${styles.messageWithAvatar}`}>
                            <div style={{ marginRight: 5 }}>
                                <BadgeAvatars badgeVisible={true} avatarClassName={`${styles.avatar}`} avatar={avatar} online={online} />
                            </div>
                            {message.text && (
                                <div className={`${styles.message} ${styles.otherMessagesColor}`}>
                                    {listMessageReactions()}
                                    {message.text}
                                </div>
                            )}
                            {renderItemFile()}
                            <MessageItemReaction
                                className={styles.messageItemReaction}
                                popUpClassName={styles.otherMessagePopUp}
                                onReaction={onReaction}
                                onClickShowPopUp={onClickShowPopUp}
                                reactionPopUpVisible={reactionPopUpVisible}
                            />
                        </div>
                    </>
                )}
                <div className={`${styles.otherReadUsersContainer}`}>
                    {renderReadUsers()}
                </div>
            </div>
        </div>
    )

}

MessageItem.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    user: PropTypes.instanceOf(Object).isRequired,
    avatar: PropTypes.string.isRequired,
    online: PropTypes.bool,
    readUsers: PropTypes.instanceOf(Array),
    onReaction: PropTypes.func,
    onClickShowPopUp: PropTypes.func,
    reactionPopUpVisible: PropTypes.bool,
    reactions: PropTypes.instanceOf(Array),
}

MessageItem.defaultProps = {
    online: false,
    readUsers: [],
    onReaction: () => undefined,
    reactions: [],
    reactionPopUpVisible: false,
}