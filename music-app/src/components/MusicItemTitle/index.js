import React from 'react';
import styles from './style.module.css'
import MusicItem from '../MusicItem';

function MusicItemTitle(props) {

    return (
        <div className={styles.ListMusic}>
            <p className={styles.titleStyle}>{props.title}</p>
            <div className={styles.wrapData}>{props.data.map((item, index) => <MusicItem imageURL={item.image} title={item.title} author={item.author} key={item._id} />)}</div>
        </div>
    )
}

export default MusicItemTitle;