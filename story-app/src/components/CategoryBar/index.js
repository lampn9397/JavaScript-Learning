import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import images from '../../assets';
import styles from './style.module.css'

function CategoryBar({ categories }) {

    return (
        <div className={`${styles.categoryBarContainer}`}>
            <div className={`${styles.categoryBarRow} flex`}>
                {categories.map((item, index) => (
                    <Link className={`${styles.categoryBarItem} alignCenter`} key={index} to='google.com'>
                        <img alt='' src={images.yinYang} className={styles.categoryBarItemIcon} />
                        <div className={`${styles.categoryBarItemInfo} column`}>
                            <div className={`${styles.categoryBarItemName}`}>{item.name}</div>
                            <div className={`${styles.categoryBarItemCount}`}>{item.storyCount}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

CategoryBar.propTypes = {
    categories: PropTypes.instanceOf(Array).isRequired,
}

CategoryBar.defaultProps = {
}

export default CategoryBar;