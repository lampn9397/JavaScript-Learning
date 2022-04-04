import React, { useCallback } from 'react';
import styles from './style.module.css'
import MusicItem from '../MusicItem';

function MusicAlbumTitle(props) {

    const onClickItem = React.useCallback((item) => () => {
        props.onClickItem(item)
    }, [props]);

    const renderItem = (item, index) => (
        <MusicItem
            imageURL={item.image}
            title={item.title}
            key={item._id}
            slug={item.slug}
            onClick={onClickItem(item)}
        />
    )


    return (
        <div className={styles.ListAlbum}>
            <p className={styles.titleStyle}>{props.title}</p>
            <div className={styles.wrapData}>{props.data.map(renderItem)}</div>
        </div>
    )
}

export default MusicAlbumTitle;