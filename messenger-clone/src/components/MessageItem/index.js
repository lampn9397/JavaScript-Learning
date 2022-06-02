import * as React from 'react';
import ArticleIcon from '@mui/icons-material/Article';

import styles from './style.module.css'
import { FileTypes } from '../../constants';

export default function MessageItem(props) {

    const renderItemFile = React.useCallback(() => {
        return (
            <div>
                {props.item.files.map((item, index) => {
                    if (item.type === FileTypes.CHAT_IMAGE) {
                        return (
                            <React.Fragment key={index}>
                                <img className={styles.imgFile} src={item.url} alt='' />
                                {(index + 1) % 3 === 0 && <br />}
                            </React.Fragment>
                        )
                    }
                    return (
                        <a href={item.url} className={styles.otherFileContainer} key={index}>
                            <div className={styles.filesIcon} >
                                <ArticleIcon />
                            </div>
                            <div className={styles.filesDescription}>{item.name}</div>
                        </a>
                    )
                })}
            </div>
        )
    }, [props.item.files])

    if (props.item.user !== props.user._id) {
        return (
            <div className={styles.otherMessageContainer} >
                {props.item.text !== '' && <div className={styles.otherMessages}>{props.item.text}</div>}
                {renderItemFile()}
            </div>
        )
    }

    return (
        <div className={styles.myMessageContainer} >
            {props.item.text !== '' && <div className={styles.myMessages}>{props.item.text}</div>}
            {renderItemFile()}
        </div>
    )
}
