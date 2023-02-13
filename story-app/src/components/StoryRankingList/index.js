import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';


function StoryRankingList({ stories, title, moreLink, className }) {

    return (
        <div className={`${styles.storyRankingListContainer} column ${className}`}>
            <div className={`${styles.storyTitleContainer} flex`}>
                <div className={styles.storyTitle}>{title}</div>
                <Link className={styles.more} to={moreLink}>
                    Tất Cả
                    <RightOutlined style={{ marginLeft: 4 }} />
                </Link>
            </div>
            <div className={styles.dash} />
            {
                stories.map((item, index) => {
                    if (index === 0) {
                        return (
                            <div className={`${styles.storyRankingItemContainer} flex`} key={item._id}>
                                <div className={styles.no1}>
                                    NO.1</div>
                                <div className={styles.storyRankingItemName}>{item.name}</div>
                            </div>
                        )
                    }
                    return (
                        <div className={`${styles.storyRankingItemContainer} flex`} key={item._id}>
                            <div className={classNames({
                                [styles.defaultNo]: index > 0,
                                [styles.no1]: index === 0,
                                [styles.no2]: index === 1,
                                [styles.no3]: index === 2,
                            })
                            }>
                                {(index === 0) && "NO."}{index + 1}</div>
                            <div className={styles.storyRankingItemName}>{item.name}</div>

                        </div>
                    )
                })
            }
        </div>
    )
}

StoryRankingList.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
    title: PropTypes.string.isRequired,
    moreLink: PropTypes.string.isRequired,
    className: PropTypes.string
}

StoryRankingList.defaultProps = {
    className: "",
}

export default StoryRankingList;