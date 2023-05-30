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
import { User } from '@/constants/types/user';
import { useDispatch } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'

interface Props {
    item: Comment,//comment cha
    user: User,
    editingCommentId?: null | string,
    onClickEdit?: (commentItem: Comment) => void
}
interface State {
    isShowReply: boolean,
}

export default function CommentItem({ item, user, editingCommentId, onClickEdit: onClickEditProps }: Props) {
    const dispatch = useDispatch();

    const [state, setState] = React.useState<State>({
        isShowReply: false,
    })

    const onClickReply = React.useCallback(() => (
        setState((prevState) => ({ ...prevState, isShowReply: !prevState.isShowReply }))
    ), [])

    const onClickEdit = React.useCallback((commentItem: Comment) => () => {
        onClickEditProps?.(commentItem)
    }, [onClickEditProps])

    const onClickLikeComment = React.useCallback((commentItem: Comment) => () => {
        dispatch({ type: ActionTypes.LIKE_COMMENT, payload: { commentId: commentItem._id } })
    }, [dispatch])

    const renderCommentItem = React.useCallback((commentItem: Comment, index: number | undefined = undefined, array: Comment[] | undefined = undefined) => {
        //commentItem:comment cha hoac con
        let isLastReply = false

        const isLiked = commentItem.likedUsers.some((userItem) => userItem === user._id)

        if (commentItem.parentComment && typeof index === 'number' && Array.isArray(array)) {
            isLastReply = array.length - 1 === index
        }

        const isMyComment = commentItem.user._id === user._id

        const isEditing = editingCommentId === commentItem._id

        return (
            <div className={classNames({
                [styles.storyItemContainer]: !isLastReply,
                [styles.storyItemMargin]: commentItem.parentComment,
            })}>
                <div className={`${styles.commentItemContainer} flex`}>
                    <Link to={publicRoutes.UserPage(commentItem.user._id).path}>
                        <Avatar size={64} src={commentItem.user.avatar} />
                    </Link>
                    {isEditing ? (
                        <CommentStoryInput isEditComment initialComment={commentItem.content} commentId={commentItem._id} />
                    ) : (
                        <div className='user-comment column'>
                            <div className='flex'>
                                <Link to={publicRoutes.UserPage(commentItem.user._id).path} className='user-name'>
                                    {commentItem.user.name}
                                </Link>
                            </div>
                            <div className='content'>{commentItem.content}</div>
                            <div className='flex comment-utils'>
                                <LikeOutlined className={classNames({
                                    "custom-like": true,
                                    "center": true,
                                    [styles.isLiked]: isLiked
                                })}
                                    onClick={onClickLikeComment(commentItem)} />
                                <div className={classNames({ [styles.isLiked]: isLiked })}>{commentItem.likedUsers.length}</div>
                                {isMyComment && (<div className='reply' onClick={onClickEdit(commentItem)}>Sửa</div>)}
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
                    )}
                </div>
                {
                    state.isShowReply && (
                        <>
                            {(!commentItem.parentComment && !isEditing) && <CommentStoryInput className={styles.storyInput} parentCommentId={commentItem._id} />}
                            {commentItem.childComments.map(renderCommentItem)}
                        </>
                    )
                }
            </div >
        )
    }, [editingCommentId, onClickEdit, onClickLikeComment, onClickReply, state.isShowReply, user._id])

    return renderCommentItem(item)
}