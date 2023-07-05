import React from 'react';

import type { Story } from '@/constants/types/story';
import styles from './style.module.scss'
import { Comment } from '@/constants/types/comment';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CommentItem from '../CommentItem';
import { DetailPageProps } from '@/Pages/DetailPage/DetailPage';
import { pageLimit } from '../../constants';
import CommentStoryInput from '../CommentStoryInput';
import { User } from '@/constants/types/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface Props {
    story: Story,
    commentList: Comment[],
    user: User,
    getComments: DetailPageProps["getComments"],
    containerClassname?: string,
}

interface State {
    editingCommentId: null | string
}

export default function StoryCommentCard({ story, commentList, user, getComments, containerClassname }: Props) {
    const currentPage = React.useRef(1)

    const commentLoading = useSelector((state: RootState) => state.comment.commentLoading)

    const [state, setState] = React.useState<State>({
        editingCommentId: null
    })

    const isShowLoadButton = React.useMemo(() => (
        commentList.length % 10 === 0 && commentList.length > 0
    ), [commentList.length])

    const onClickEdit = React.useCallback((commentItem: Comment) => {
        setState((prevState) => ({ ...prevState, editingCommentId: commentItem._id }))
    }, [])

    const onClickCloseEditComment = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, editingCommentId: null }))
    }, [])

    React.useEffect(() => {
        if (!commentLoading) setState((prevState) => ({ ...prevState, editingCommentId: null }))
    }, [commentLoading])

    const renderCommentItem = React.useCallback((item: Comment) => (
        <CommentItem
            item={item}
            key={item._id}
            user={user}
            editingCommentId={state.editingCommentId}
            onClickEdit={onClickEdit}
            onClickCloseEditComment={onClickCloseEditComment}
        />
    ), [onClickCloseEditComment, onClickEdit, state.editingCommentId, user])

    const onClickMoreComment = React.useCallback(() => (
        getComments(story?._id, ++currentPage.current, pageLimit)
    ), [getComments, story?._id])

    return (
        <div className={`${styles.storyContainer} flex ${containerClassname}`}>
            <div className='column-container column'>
                <div className='header'>
                    Lời Bình Luận Từ Độc Giả
                </div>
                {user ? (
                    <CommentStoryInput />
                ) : (
                    <div className='center'>
                        <Button icon={<PlusCircleOutlined />} size="large" className='commentBut'>
                            Đăng nhập để bình luận
                        </Button>
                    </div>
                )}
                {commentList.map(renderCommentItem)}
                {
                    isShowLoadButton && (
                        <div className='center more-comment' onClick={onClickMoreComment}>
                            <Button size="large" className='commentBut'>
                                Xem thêm bình luận
                            </Button>
                        </div>
                    )
                }
            </div >
        </div >
    )
}