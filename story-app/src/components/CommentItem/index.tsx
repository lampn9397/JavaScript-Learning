import React from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/vi';
import moment from 'moment';

import styles from './style.module.scss'
import { publicRoutes } from '../../constants/index';
import { Comment } from '@/constants/types/comment';
import { Avatar } from 'antd';
import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import CommentStoryInput from '../CommentStoryInput';

interface Props {
    item: Comment,
}

export default function CommentItem({ item }: Props) {
    const [state, setState] = React.useState({
        isShowReply: false,
    })

    const onClickReply = React.useCallback(() => (
        setState((prevState) => ({ ...prevState, isShowReply: !prevState.isShowReply }))
    ), [])

    const renderCommentItem = React.useCallback((commentItem: Comment, index: number | undefined = undefined, array: Comment[] | undefined = undefined) => {
        let isLastReply = false

        if (commentItem.parentComment && typeof index === 'number' && Array.isArray(array)) {
            isLastReply = array.length - 1 === index
        }

        return (
            <div className={classNames({
                [styles.storyItemContainer]: !isLastReply,
                [styles.storyItemMargin]: commentItem.parentComment,
            })}>
                <div className={`${styles.commentItemContainer} flex`}>
                    <Link to={publicRoutes.UserPage(commentItem.user._id).path}>
                        <Avatar size={64} src={commentItem.user.avatar} />
                    </Link>
                    <div className='user-comment column'>
                        <Link to={publicRoutes.UserPage(commentItem.user._id).path} className='user-name'>{commentItem.user.name}</Link>
                        <div className='content'>{commentItem.content}</div>
                        <div className='flex comment-utils'>
                            {/*TODO: chua lap API */}
                            <LikeOutlined className='custom-like center' />
                            <div>{commentItem.likedUsers.length}</div>
                            {!commentItem.parentComment && (
                                <div className='reply flex' onClick={onClickReply}>
                                    <CommentOutlined className='center' />
                                    <div>{commentItem.childComments.length}</div>
                                    <div>Trả Lời</div>
                                </div>
                            )}
                            <div className='time-reply'>{moment(commentItem.updatedAt).format("HH:mm DD/MM")}</div>
                        </div>
                    </div>
                </div>
                {state.isShowReply && (
                    <>
                        {!commentItem.parentComment && <CommentStoryInput className={styles.storyInput} />}
                        {commentItem.childComments.map(renderCommentItem)}
                    </>
                )}
            </div>
        )
    }, [onClickReply, state.isShowReply])

    return renderCommentItem(item)
}