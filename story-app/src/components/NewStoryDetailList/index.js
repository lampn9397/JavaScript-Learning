import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.module.css'
import { Link } from 'react-router-dom';


function NewStoryDetailList({ stories }) {

    return (
        <div className={`${styles.NewStoryDetailListContainer}`}>
            <div className={styles.title}>Truyện Mới Cập Nhật</div>
            <div className={`${styles.newStoryDetailListItemsContainer} flex`}>
                {stories.map((item, index) => (
                    <div className={`${styles.newStoryDetailListRow} flex`} key={item._id}>
                        <div className={`${styles.newStoryDetailListItem} flex`}>
                            <Link className={styles.storyPosterContainer} to={`/truyen/${item.slug}`}>
                                <img src={item.poster} alt="" className={styles.StoryPoster} />
                            </Link>
                            <div className={classNames({
                                [styles.storyItemContainer]: true,
                                column: true,
                                [styles.evenNumberStory]: index % 2 === 0,
                            })}>
                                <Link className={styles.storyItemName} to={`/truyen/${item.slug}`}>
                                    {item.name}
                                </Link>
                                <Link className={styles.StoryItemAuthor} to={`/tac-gia/${item.author?._id}`}>{item.author?.name} </Link>
                                <div className={`${styles.storyItemOtherDetailContainer} flex`}>
                                    <div className={styles.storyItemTotalChapter}>
                                        {item.totalChapter}
                                        <div className={styles.smallerText}>Chương </div>
                                    </div>
                                    <div className={styles.storyItemTotalViews}>
                                        {item.totalViews}
                                        <div className={styles.smallerText}>Lượt xem </div></div>
                                </div>
                                <div className={styles.storyItemDescriptionContainer}>{item.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

NewStoryDetailList.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
}

NewStoryDetailList.defaultProps = {
}

export default NewStoryDetailList;