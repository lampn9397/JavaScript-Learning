import React from 'react';
import styles from './style.module.css'
import { Link } from 'react-router-dom';

import images from '../../assets';
import { routes } from '../../constants';

function suggestMusic(props) {

    return (
        <Link className={styles.suggestMusicContainer} to={routes.MusicDetail(props.slug).path}>
            <div className={styles.functionHover}>
                <img className={styles.songNote} src={images.songNote} alt='' />
                <img className={styles.play} src={images.blackPlay} alt='' />
                <div className={styles.songInforContainer}>
                    <div className={styles.songInfor}>
                        <div className={styles.titleAuthor}>{props.title}</div>
                        <div className={styles.space} />
                        <img className={styles.headPhone} src={images.headphone} alt='' />
                        <div>{props.views}</div>
                    </div>
                    <div className={styles.titleAuthor}>{props.author}</div>
                </div>
            </div>
        </Link>
    )
}

export default suggestMusic;