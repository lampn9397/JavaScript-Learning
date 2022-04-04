import React from 'react';
import styles from './style.module.css'

function Loading(props) {
    return (
        <div className={styles.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading;