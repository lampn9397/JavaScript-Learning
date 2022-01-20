import React from 'react';
import styles from './style.module.css'
import MusicItem from '../MusicAlbum';

function MusicAlbumTitle(props) {

    return (
        <div className={styles.ListAlbum}>
            <p className={styles.titleStyle}>{props.title}</p>
            <div className={styles.wrapData}>{props.data.map((item, index) => <MusicItem imageURL={item.image} title={item.title} key={item.id} />)}</div>
        </div>
    )
}

export default MusicAlbumTitle;