import React from 'react';
import styles from './style.module.css'

function Lyric(props) {

    return (
        <div className={styles.lyricContainer}>
            <div className={styles.musicInfor}>
                <div className={styles.title}>Lời Bài Hát : {props.title}</div>
                <div className={styles.author}>{props.author}</div>
            </div>
            <div className={styles.lyric}>{props.lyric}</div>
        </div>
    )
}

export default Lyric;