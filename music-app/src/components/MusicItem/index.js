import React from 'react';
import styles from './style.module.css'

function MusicItem(props) {

    return (
        <div><img src={props.imageURL} alt='' className={styles.leftImage} /> <div className={styles.titleStyle}>{props.title}</div> <div>{props.author}</div></div>
    )
}

export default MusicItem;