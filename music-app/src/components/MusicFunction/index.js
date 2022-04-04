import React from 'react';
import images from '../../assets';
import styles from './style.module.css'

function MusicFunction(props) {

    return (
        <div className={styles.musicFunctionContainer}>
            <div className={styles.space}></div>
            <div className={styles.functionHover}>
                <img src={images.addHeart} className={styles.musicFunctionIcon} />
                <div>Thêm vào</div>
            </div>

            <div className={styles.functionHover}>
                <img src={images.download} className={styles.musicFunctionIcon} />
                <div>Tải nhạc</div>
            </div>

            <div className={styles.functionHover}>
                <img src={images.share} className={styles.musicFunctionIcon} />
                <div>Chia sẻ</div>
            </div>

            <div className={styles.functionHover}>
                <img src={images.ringtone} className={styles.musicFunctionIcon} />
                <div>Nhạc chờ</div>
                <div className={styles.threeDot}>...</div>
            </div>


        </div>
    )
}

export default MusicFunction;