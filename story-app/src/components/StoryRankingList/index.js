import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { publicRoutes } from '../../constants';


function StoryRankingList({ stories, title, moreLink, className, countField, topOneType }) {

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
                            <div className={`${styles.storyRankOneItemContainer} ${styles.spaceBetween} flex`} key={item._id}>
                                <div className={`${styles.topOneRankingInfor} flex`}>
                                    <div className={styles.no1}>NO.1</div>
                                    <Link className={`${styles.rankOneItemName} long-content`} to={publicRoutes.DetailPage(item.slug).path}>{item.name}</Link>
                                    <div className={`${styles.rankOneType} flex`}>
                                        <div className={styles.RankOneNumber}>{item[countField]}</div>
                                        <div className={styles.topOneType}>{topOneType}</div>
                                    </div>
                                    <div className={`${styles.topOneAuthorContainer} flex`}>
                                        <Link to={`/danh-muc/${item.category.slug}`}>
                                            <div className={`${styles.topOneCategory} ${styles.authorColor}`}>{item.category.name}</div>
                                        </Link>
                                        <Link to={publicRoutes.AuthorPage(item.author?._id).path}>
                                            <div className={`${styles.topOneAuthorName} ${styles.authorColor} long-content`}>{item.author?.name}</div>
                                        </Link>
                                    </div>
                                </div>
                                <Link className={styles.rankOnePosterContainer} to={publicRoutes.DetailPage(item.slug).path}>
                                    <img src={item.poster} alt="" className={styles.rankOnePoster} />
                                    <div className={styles.bookPage}> </div>
                                    <div className={styles.shadow}> </div>
                                </Link>
                            </div>
                        )
                    }
                    return (
                        <div className={`${styles.storyRankingItemContainer} flex`} key={item._id}>
                            <div className={classNames({
                                [styles.defaultNo]: true,
                                [styles.no2]: index === 1,
                                [styles.no3]: index === 2,
                            })}>
                                {index + 1}
                            </div>
                            <div className={`${styles.storyRankingItem} flex`}>
                                <Link className='long-content' to={publicRoutes.DetailPage(item.slug).path}>{item.name}</Link>
                                <div className={styles.storyRankingItemCount}>{item[countField]}</div>
                            </div>
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
    className: PropTypes.string,
    countField: PropTypes.string.isRequired,
    topOneType: PropTypes.string.isRequired,
}

StoryRankingList.defaultProps = {
    className: "",
}

export default StoryRankingList;