import React from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/vi';
import moment from 'moment';

import styles from './style.module.scss'
import { publicRoutes } from '../../constants/index';
import { Avatar } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Rating } from '@/constants/types/rating';
import RatingStar from '../RatingStar';
import { useDispatch } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'

interface Props {
    item: Rating,
}

export default function RatingItem({ item }: Props) {
    const dispatch = useDispatch();

    const onLikeRating = React.useCallback((ratingItem: Rating) => () => {
        dispatch({ type: ActionTypes.LIKE_RATING, payload: { ratingId: ratingItem._id } })
    }, [dispatch])

    const renderCommentItem = React.useCallback((ratingItem: Rating) => {
        return (
            <div className={styles.storyItemContainer}>
                <div className={`${styles.commentItemContainer} flex`}>
                    <Link to={publicRoutes.UserPage(ratingItem.user._id).path}>
                        <Avatar size={64} src={ratingItem.user.avatar} />
                    </Link>
                    <div className='user-rating column'>
                        <div className='flex rating-utils-container'>
                            <div className='rating-container flex center'>
                                <Link
                                    to={publicRoutes.UserPage(ratingItem.user._id).path}
                                    className='user-name'
                                >
                                    {ratingItem.user.name}
                                </Link>
                                <RatingStar ratingNumber={ratingItem.rating} size={14} />
                            </div>
                            {/*TODO: chua lap API */}
                            <div className='like-container flex center' onClick={onLikeRating(ratingItem)}>
                                <LikeOutlined className='custom-like' />
                                <div>{ratingItem.likedUsers.length}</div>
                            </div>
                        </div>
                        <div className='feedback'>{ratingItem.feedback}</div>
                        <div className='time-reply'>{moment(ratingItem.createdAt).format("HH:mm DD/MM")}</div>
                    </div>
                </div>
            </div>
        )
    }, [onLikeRating])

    return renderCommentItem(item)
}