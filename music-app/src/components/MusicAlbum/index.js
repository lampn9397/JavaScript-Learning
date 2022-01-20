import React from 'react';
import styles from './style.module.css'

function MusicAlbum(props) {

    return (
        <div><img src={props.imageURL} alt='' className={styles.leftImage} /> <div className={styles.titleStyle}>{props.title}</div> </div>
    )
}

export default MusicAlbum;