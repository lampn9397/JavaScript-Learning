import React from 'react';

import type { Story } from '@/constants/types/story';
import styles from './style.module.scss'
import { Button } from 'antd';
import { DetailPageProps } from '@/Pages/DetailPage/DetailPage';
import { pageLimit } from '../../constants';
import { Rating } from '@/constants/types/rating';
import RatingItem from '../RatingItem';
import { User } from '@/constants/types/user';

interface Props {
    story: Story,
    ratingList: Rating[],
    user: User,//TODO: chua lap API,
    getRatings: DetailPageProps["getRatings"]
}

export default function RatingCard({ story, ratingList, user, getRatings }: Props) {
    const currentPage = React.useRef(1)

    const isShowLoadButton = React.useMemo(() => (
        ratingList.length % 10 === 0 && ratingList.length > 0
    ), [ratingList.length])

    const renderCommentItem = React.useCallback((item: Rating) => (
        <RatingItem item={item} key={item._id} />
    ), [])

    const onClickMoreComment = React.useCallback(() => (
        getRatings(story._id, ++currentPage.current, pageLimit)
    ), [getRatings, story._id])

    return (
        <div className={`${styles.storyContainer} flex`}>
            <div className='column-container column'>
                <div className='header'>
                    Đánh Giá Từ Độc Giả
                </div>
                {ratingList.map(renderCommentItem)}
                {
                    isShowLoadButton && (
                        <div className='center more-rating' onClick={onClickMoreComment}>
                            <Button size="large" className='ratingBut'>
                                Xem thêm đánh giá
                            </Button>
                        </div>
                    )
                }
            </div >
        </div >
    )
}