import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css'
import { Link } from 'react-router-dom';


function StoryRankingList({ stories, title, moreLink }) {

    return (
        <div className={`${styles.storyRankingListContainer} column`}>
            <div className={`${styles.storyTitleContainer} flex`}>
                <div className={styles.storyTitle}>{title}</div>
                <Link className={styles.more} to={moreLink}>Tất Cả</Link>
            </div>
            {
                stories.map((item) => (
                    <div className={styles.storyRankingItemContainer} key={item._id}>
                        {item.name}
                    </div>
                ))
            }
        </div>
    )
}

StoryRankingList.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
    title: PropTypes.string.isRequired,
    moreLink: PropTypes.string.isRequired,
}

StoryRankingList.defaultProps = {
}

export default StoryRankingList;