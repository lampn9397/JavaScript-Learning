import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { publicRoutes } from '../../constants';


function NewCompleteStory({ stories, category = undefined }) {

    return (
        <div className={styles.NewCompleteStoryContainer}>
            <div className={`${styles.newCompleteStoryTitleContainer} flex`}>
                <div className={styles.newCompleteStoryTitle}>Truyện Đã Hoàn Thành</div>
                <Link className={styles.more} to={publicRoutes.FilterPage({ status: "COMPLETED", category }).path}>Tất Cả</Link>
            </div>
            <div className='flex'>
                <div className={`${styles.lastestCompleteStoryContainer} column`}>
                    <Link to={publicRoutes.StoryDetail(stories[0]?.slug).path}>
                        <img src={stories[0]?.poster} alt="" className={styles.lastestStoryPoster} />
                    </Link>
                    <Link
                        className={`${styles.latestCompleteStoryName} long-content`}
                        to={publicRoutes.StoryDetail(stories[0]?.slug).path}
                    >
                        {stories[0]?.name}
                    </Link>
                    <Link
                        className={`${styles.latestCompleteStoryAuthor} long-content`}
                        to={publicRoutes.AuthorPage(stories[0]?.author?._id).path}
                    >
                        {stories[0]?.author.name}
                    </Link>
                    <div className={`${styles.latestCompleteStoryTotalChapter} center`}> {stories[0]?.totalChapter}
                        <div className={styles.smallerText}>Chương</div>
                    </div>
                    <div className={`${styles.latestCompleteStoryDescription} long-content`}> {stories[0]?.description}</div>
                </div>
                <div className={`${styles.otherStoryListContainer} flexOne`}>
                    {stories.slice(1).map((item) => {
                        return (
                            <div key={item._id} className={`${styles.otherStoryItem} flex`}>
                                <Link to={publicRoutes.StoryDetail(item.slug).path}>
                                    <img src={item.poster} alt="" className={styles.otherStoryPoster} />
                                </Link>
                                <div className={`${styles.otherStoryInfor} column`}>
                                    <Link className={`${styles.otherStoryName} long-content`} to={publicRoutes.StoryDetail(item.slug).path}>
                                        {item.name}
                                    </Link>
                                    <Link className={`${styles.otherStoryAuthor} long-content`} to={publicRoutes.AuthorPage(stories[0]?.author?._id).path}>
                                        {item.author.name}
                                    </Link>
                                    <div className={`${styles.completeDetailContainer} flex`}>
                                        <div className={styles.completeStoryTotalChapter}>
                                            {item.totalChapter}
                                            <div className={styles.smallerText}>Chương </div>
                                        </div>
                                        <div className={styles.completeStoryItemTotalViews}>
                                            {item.totalViews}
                                            <div className={styles.smallerText}>Lượt xem </div></div>
                                    </div>
                                    <div className={styles.completeStoryDescriptionContainer}>{item.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

NewCompleteStory.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
}

NewCompleteStory.defaultProps = {
}

export default NewCompleteStory;