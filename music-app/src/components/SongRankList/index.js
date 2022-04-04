import React from 'react';
import styles from './style.module.css'

import SongRankItem from '../SongRankItem';

function SongRankList(props) {

    return (

        <div className={styles.musicRank}>
            {props.item.songs.map((item, index) => {
                return <SongRankItem number={index + 1} title={item.title} singer={item.singer} image={item.image} key={index} />
            })}
        </div>

    )
}

export default SongRankList;