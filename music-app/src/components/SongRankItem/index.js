import React from 'react';
import styles from './style.module.css'
import classNames from 'classnames';

function SongRankItem(props) {

    return (
        <div className={classNames({
            [styles.songRankItem]: true,
            [styles.firstItem]: props.number === 1,
        })}>
            <div className={styles.wraper}>
                {props.number === 1 && (
                    <img className={styles.image} src={props.image} alt='' />
                )}
                <div className={classNames({
                    [styles.number]: true,
                    [styles.one]: props.number === 1,
                    [styles.two]: props.number === 2,
                    [styles.three]: props.number === 3
                })}>{props.number}</div>
            </div>
            <div className={styles.info}>
                <a className={styles.songTitle}>{props.title}</a>
                <a className={styles.nameSinger}>{props.singer}</a>
            </div>
        </div>
    )
}

export default SongRankItem;