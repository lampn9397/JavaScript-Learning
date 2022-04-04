import React from 'react';
import styles from './style.module.css'

import images from '../../assets';

function Rank(props) {

    return (
        <div className={styles.rankContainer}>
            <a className={styles.rank} href='google.com' >
                BXH Bài Hát
            </a>
            <img src={images.blackPlay} alt='' className={styles.iconPlay} />
        </div>

    )
}

export default Rank;