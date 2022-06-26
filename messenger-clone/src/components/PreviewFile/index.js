import * as React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ClearIcon from '@mui/icons-material/Clear';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import styles from './style.module.css'

export default function PreviewFile(props) {
    const inputRef = React.useRef()

    const [state, setState] = React.useState({
        previewFileContainerWidth: undefined
    })

    React.useEffect(() => {
        const previewFileContainerWidth = inputRef.current.getBoundingClientRect().width;
        setState((prevState) => ({ ...prevState, previewFileContainerWidth }))
    }, []);

    const onClickClearIcon = React.useCallback((item, index) => () => {
        props.onClickRemove(item, index)
    }, [props])

    return (
        <div
            className={styles.PreviewFileContainer}
            ref={inputRef}
            style={{
                maxWidth: state.previewFileContainerWidth,
                overflowX: props.PreviewFile?.length ? 'scroll' : undefined
            }}
        >
            {props.PreviewFile?.map((item, index) => {
                if (typeof item === 'string') {
                    return (
                        <div key={index} className={styles.previewImgContainer}>
                            <img className={styles.previewImg} src={item} alt='' />
                            <div className={styles.clearImgContainer} onClick={onClickClearIcon(item, index)}>
                                <ClearIcon fontSize='12px' />
                            </div>
                        </div>
                    )
                }

                if (item.type.startsWith('video')) {
                    return (
                        <div className={styles.previewVideo} key={index}>
                            <PlayCircleOutlineIcon className={styles.playIcon} />
                            <div className={styles.clearVideo} onClick={onClickClearIcon(item, index)}>
                                <ClearIcon fontSize='12px' />
                            </div>
                        </div>
                    )
                }

                return (
                    <div className={styles.fileItemContainer} key={index}>
                        <div className={styles.previewOtherFileType} >
                            <div>
                                <div className={styles.filesIcon} >
                                    <ArticleIcon />
                                </div>
                            </div>
                            <div className={styles.filesDescription}>{item.name}</div>
                        </div>
                        <div className={styles.clearIconContainer} onClick={onClickClearIcon(item, index)}>
                            <ClearIcon fontSize='12px' />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}