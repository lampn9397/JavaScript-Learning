import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './style.module.scss'
import { publicRoutes } from '../../constants';
import { getStoryStatusLabel } from '../../utils';
import images from '../../assets'
import { BookOutlined } from '@ant-design/icons';
import RatingStar from '../RatingStar';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from "../../redux/actionTypes";
import RatingModal from '../RatingModal';
import { getReadingProgress } from '../../utils/chapter';
function StoryOverview({ story }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user)

    const chapterList = useSelector((state) => state.chapter.chapterList)

    const isStoryLiked = useSelector((state) => state.story.isStoryLiked)

    const isStoryFollowed = useSelector((state) => state.story.isStoryFollowed)

    const createRatingLoading = useSelector((state) => state.rating.createRatingLoading)

    const readingProgess = React.useMemo(() => {
        return getReadingProgress(story.slug)
    }, [story.slug])

    const [state, setState] = React.useState({
        isRatingModalOpen: false,
    })

    const firstChapter = React.useMemo(() => {
        const min = Math.min(...chapterList.map((chapterItem) => chapterItem.numberOrder))
        return chapterList.find((chapterItem) => chapterItem.numberOrder === min)
    }, [chapterList])

    const avgStoryPoint = React.useMemo(() => {
        if (story.totalRatings === 0) return 0
        return Math.round((story.totalRatingPoints / story.totalRatings) * 10) / 10
    }, [story.totalRatingPoints, story.totalRatings])

    const onClickRating = React.useCallback(() => {
        if (user) {
            setState((prevState) => ({ ...prevState, isRatingModalOpen: !prevState.isRatingModalOpen }))
        } else {
            dispatch({ type: ActionTypes.TOGGLE_AUTH_MODAL })
        }
    }, [dispatch, user])

    const onCancleRatingModal = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isRatingModalOpen: !prevState.isRatingModalOpen }))
    }, [])

    const onSubmitRating = React.useCallback((rating, feedback) => {
        dispatch({
            type: ActionTypes.RATING_STORY,
            payload: {
                rating,
                feedback,
                storyId: story._id,
                callback: (success) => {
                    if (success) setState((prevState) => ({ ...prevState, isRatingModalOpen: false }))
                },
            }
        })
    }, [dispatch, story._id])

    const onClickLikeButton = React.useCallback(() => {
        dispatch({
            type: ActionTypes.LIKE_STORY,
            payload: {
                storyId: story._id,
            }
        })
    }, [dispatch, story._id])

    const onClickFollowButton = React.useCallback(() => {
        dispatch({
            type: ActionTypes.FOLLOW_STORY,
            payload: {
                storyId: story._id,
            }
        })
    }, [dispatch, story._id])

    React.useEffect(() => {
        const payload = {
            storyId: story._id,
        }

        dispatch({
            type: ActionTypes.GET_LIKE_STORY_STATUS,
            payload
        })

        dispatch({
            type: ActionTypes.GET_FOLLOW_STORY_STATUS,
            payload
        })
    }, [dispatch, story._id])

    return (
        <div className={`${styles.container} flex`}>
            <Link
                to={publicRoutes.ChapterDetail(story.slug, firstChapter?.numberOrder).path}
                className='poster-container'
            >
                <img src={story.poster} alt='' className='story-poster' />
            </Link>
            <div className='space-between flex-fill'>
                <div className='story-infor column space-between flex-fill'>
                    <div>
                        <div className='story-name'>{story.name}</div>
                        <div className='story-category-container flex'>
                            <Link className='story-category author-color'
                                to={publicRoutes.AuthorPage(story.author?._id).path}
                            >
                                {story.author.name}
                            </Link>
                            <Link
                                className='story-category status-color'
                                to={publicRoutes.FilterPage({ status: story.status }).path}
                            >
                                {getStoryStatusLabel(story.status)}
                            </Link>
                            <Link
                                className='story-category category-color'
                                to={publicRoutes.FilterPage({ category: story.category.slug }).path}
                            >
                                {story.category.name}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className='story-reviews-container flex'>
                            <div className='story-total-chapter chapter-color flex'>
                                {story.totalChapter}
                                <div className='smaller-text'>Chương</div>
                            </div>
                            <div className='story-total-chapter views-color flex'>
                                {story.totalViews}
                                <div className='smaller-text'>Lượt Xem</div>
                            </div>
                            <div className='story-total-chapter likes-color flex'>
                                {story.totalLikes}
                                <div className='smaller-text no-right-boder'>Lượt Thích</div>
                            </div>
                            <div className='story-total-chapter follows-color flex'>
                                {story.totalFollows}
                                <div className='smaller-text no-right-boder'>Lượt Theo Dõi</div>
                            </div>
                        </div>
                        <div className='bottom-story-reviews flex'>
                            {readingProgess?.progress ? (
                                <Link className='read-first-chapter'
                                    to={publicRoutes.ChapterDetail(story.slug, readingProgess.progress.chapterNumberOrder).path}
                                >
                                    Đọc Tiếp
                                </Link>
                            ) : (
                                <Link className='read-first-chapter'
                                    to={publicRoutes.ChapterDetail(story.slug, firstChapter?.numberOrder).path}
                                >
                                    Đọc Từ Đầu
                                </Link>
                            )}
                            <button
                                className={classNames({
                                    "story-action center": true,
                                    "button-like-clicked": isStoryLiked,
                                })}
                                onClick={onClickLikeButton}
                            >
                                <img className='story-action-icon' src={images['ngon-tinh']} alt='' />
                                Yêu Thích
                            </button>
                            <button
                                className={classNames({
                                    "story-action center follow-button": true,
                                    "button-follow-clicked": isStoryFollowed,
                                })}
                                onClick={onClickFollowButton}
                            >
                                <BookOutlined />
                                Theo Dõi
                            </button>
                        </div>
                    </div>
                </div>
                <div className='column-container column alignCenter'>
                    <div className='rating-container column center' onClick={onClickRating}>
                        <div className='story-total-point center'>
                            <div className='story-point'>{avgStoryPoint}</div>
                            <div className='total-point'>/5</div>
                            <div className='rating-container-hover center'>
                                <img src={images.add} className='add-icon' alt='' />
                            </div>
                        </div>
                        <div className='story-number-rating center'>{story.totalRatings} Đánh Giá</div>
                    </div>
                    <RatingStar ratingNumber={avgStoryPoint} onClick={onClickRating} />
                </div>
            </div>
            <RatingModal
                open={state.isRatingModalOpen}
                oncancel={onCancleRatingModal}
                onSubmitRating={onSubmitRating}
                ratingStoryLoading={createRatingLoading}
            />
        </div>
    )
}

StoryOverview.propTypes = {
    story: PropTypes.instanceOf(Object).isRequired,
}

StoryOverview.defaultProps = {
}

export default StoryOverview;