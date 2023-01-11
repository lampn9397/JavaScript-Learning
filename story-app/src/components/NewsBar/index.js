import React from 'react';

import images from '../../assets';
import styles from './style.module.css'

function NewsBar({ categories }) {

    return (
        <div className={`${styles.newsBarContainer}`}>
            <div className={`${styles.newsBarRow} flex`}>
                {categories.map((item, index) => (
                    <div className={`${styles.newsBarItem} center`} key={index}>
                        <img alt='' src={images.yinYang} className={styles.newsBarItemIcon} />
                        <div className={`${styles.newsBarItemInfo} column`}>
                            <div className={`${styles.newsBarItemName}`}>{item.name}</div>
                            <div className={`${styles.newsBarItemCount}`}>{item.storyCount}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsBar;