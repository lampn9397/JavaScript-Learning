import React from 'react';
import styles from './style.module.css'

function SlideShow(props) {
    const [currentImg, setCurrentImg] = React.useState(0);

    function onNextImg() {
        if (currentImg >= props.slideSong.length - 1)
            return setCurrentImg(0)
        setCurrentImg(currentImg + 1)
    }

    function onPreImg() {
        if (currentImg <= 0)
            return setCurrentImg(props.slideSong.length - 1)
        setCurrentImg(currentImg - 1)
    }
    return (
        <div className={styles.wrapper}>
            {props.slideSong.map((item, index) => (
                <img
                    className={styles.songImg}
                    src={item.image}
                    key={index}
                    style={{ zIndex: index == currentImg ? 98 : index }}
                    alt=''
                />
            ))}

            <div className={styles.display} style={{ top: "50%" }} onClick={onPreImg}>&#10094;</div>
            <div className={styles.display} style={{ top: "50%", right: 0 }} onClick={onNextImg}>&#10095;</div>
        </div>
    )
}

export default SlideShow;