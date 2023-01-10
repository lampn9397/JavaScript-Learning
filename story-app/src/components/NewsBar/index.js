import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style.module.css'
import images from '../../assets';
import * as ActionTypes from '../../redux/actionTypes'

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