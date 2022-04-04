import React from 'react';
import { Link } from 'react-router-dom';

import images from '../../assets';
import styles from './style.module.css'
import { routes } from '../../constants';

function MusicItem(props) {

    return (
        <Link className={styles.musicItemWrap} to={routes.MusicDetail(props.slug).path}>
            <div className={styles.imageContainer}>
                <div className={styles.imageOverlay}>
                    <img className={styles.iconPlay} src={images.play} alt='' />
                </div>
                <img src={props.imageURL} alt='' className={styles.leftImage} />
            </div>
            <div className={styles.titleStyle}>{props.title}</div>
            <div>{props.author}</div>
        </Link>
    )
}

export default MusicItem;