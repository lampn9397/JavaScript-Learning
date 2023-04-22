import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './style.module.scss'
import { publicRoutes } from '../../constants';
import { getChapterSlug, getChapterStatus } from '../../utils';
import images from '../../assets'
import { BookOutlined } from '@ant-design/icons';
import RatingStar from '../RatingStar';

function StoryOverview({ story }) {
    const avgStoryPoint = React.useMemo(() => {
        if (story.totalRatings === 0) return story.totalRatings
        return story.totalRatingPoints / story.totalRatings
    }, [story.totalRatingPoints, story.totalRatings])

    return (
        <div className={`${styles.container} flex`}>
            <Link
                to={publicRoutes.ChapterPage({
                    storySlug: story.slug,
                    chapterSlug: getChapterSlug(1),
                }).path}
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
                                {getChapterStatus(story.status)}
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
                            <Link className='read-first-chapter'
                                to={publicRoutes.ChapterPage({
                                    storySlug: story.slug,
                                    chapterSlug: getChapterSlug(1),
                                }).path}
                            >
                                Đọc Từ Đầu
                            </Link>
                            <button className='story-action center'>
                                <img className='story-action-icon' src={images['ngon-tinh']} alt='' />
                                Yêu Thích
                            </button>
                            <button className='story-action center'>
                                <BookOutlined />
                                Theo Dõi
                            </button>
                        </div>
                    </div>
                </div>
                <div className='column-container column alignCenter'>
                    <div className='rating-container column center'>
                        <div className='story-total-point center'>
                            <div className='story-point'>{avgStoryPoint}</div>
                            <div className='total-point'>/5</div>
                        </div>
                        <div className='story-number-rating center'>{story.totalRatings} Đánh Giá</div>
                    </div>
                    <RatingStar ratingNumber={avgStoryPoint} />
                </div>
            </div>
        </div>
    )
}

StoryOverview.propTypes = {
    story: PropTypes.instanceOf(Object).isRequired,
}

StoryOverview.defaultProps = {
}

export default StoryOverview;