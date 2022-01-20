import React from 'react';
import styles from './style.module.css'

function RightMusic(props) {

    return (
        <div><img src={props.imageURL} alt='' className={styles.leftImage} /> <div>{props.title}</div> </div>
    )
}

export default RightMusic;