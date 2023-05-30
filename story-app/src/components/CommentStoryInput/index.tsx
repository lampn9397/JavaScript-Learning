import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

import styles from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'
import { RootState } from '@/redux/store';
import { SendOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface Props {
    className?: string,
    parentCommentId?: string,
    isEditComment?: boolean,
    initialComment?: string,
    commentId?: string,
}

export default function CommentStoryInput({ className = "", parentCommentId, isEditComment, initialComment = "", commentId }: Props) {
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        content: initialComment
    })

    const storyDetail = useSelector((state: RootState) => state.storyDetail.detail)

    const onChangeStoryComment = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, content: event.target.value }))
    }, [])

    const onClickSendComment = React.useCallback(() => {
        dispatch({
            type: ActionTypes.SEND_COMMENT, payload: {
                content: state.content,
                storyId: storyDetail._id,
                commentId,
                parentCommentId
            }
        })
        setState((prevState) => ({ ...prevState, content: "" }))
    }, [commentId, dispatch, parentCommentId, state.content, storyDetail._id])

    return (
        <div className={`${styles.commentStoryInput} column ${className}`}>
            <TextArea
                placeholder="Nhập Bình Luận"
                autoSize={{ minRows: 3, maxRows: 5 }}
                maxLength={300}
                value={state.content}
                onChange={onChangeStoryComment}
                className={classNames({
                    [styles.paddingRight]: isEditComment
                })}
            />
            {isEditComment ? (
                <SendOutlined className='send-icon' onClick={onClickSendComment} />
            ) : (
                <Button className='custom-but' onClick={onClickSendComment}>Gửi Bình Luận</Button>
            )}
        </div >
    )
}