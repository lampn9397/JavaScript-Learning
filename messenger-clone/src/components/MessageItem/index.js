import * as React from 'react';
import ArticleIcon from '@mui/icons-material/Article';

import styles from './style.module.css'
import { FileTypes, fullScreenImageRef } from '../../constants';

export default function MessageItem(props) {

    const onClickImage = React.useCallback((item) => () => {
        fullScreenImageRef.current.show(item, props.item.files)

    }, [props.item.files])

    const renderItemFile = React.useCallback(() => {
        return (
            <div>
                {props.item.files.map((item, index) => {
                    if (item.type === FileTypes.CHAT_IMAGE) {
                        return (
                            <React.Fragment key={index}>
                                <img className={styles.imgFile} src={item.url} alt='' onClick={onClickImage(item)} />
                                {(index + 1) % 3 === 0 && <br />}
                            </React.Fragment>
                        )
                    }

                    if (item.type === FileTypes.CHAT_VIDEO) {
                        return (
                            <React.Fragment key={index}>
                                <video width="320" height="240" controls className={styles.video}>
                                    <source src={item.url} type="video/mp4" />
                                </video>
                                <br />
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
    }, [onClickImage, props.item.files])

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
