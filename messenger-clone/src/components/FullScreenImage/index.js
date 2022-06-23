import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './style.module.css'
import { FileTypes } from '../../constants';

export default class FullScreenImage extends React.Component {

    containerRef = React.createRef()

    state = {
        visible: false,
        currentIndexImg: 0,
        listImages: [],
    }

    onKeyDownExitFullScreenImg = (event) => {
        if (event.key === "Escape") {
            this.onClickClearIcon()
        }
    }

    show = (item, listFile) => {
        const listImages = listFile.filter((imgFile) => imgFile.type === FileTypes.CHAT_IMAGE)

        const currentIndexImg = listImages.findIndex((imageItem) => imageItem.name === item.name)

        this.setState({
            visible: true,
            listImages,
            currentImage: item.url,
            currentIndexImg,
        })

        setTimeout(() => {
            this.containerRef.current.focus()
        }, 500)
    }

    onClickClearIcon = () => {
        this.setState({
            visible: false,
        })
    }

    onClickNext = () => {
        if (this.state.currentIndexImg >= this.state.listImages.length - 1) return this.setState({ currentIndexImg: 0 })
        this.setState({
            currentIndexImg: this.state.currentIndexImg + 1,
        })
    }
    onClickBack = () => {
        if (this.state.currentIndexImg <= 0) return this.setState({ currentIndexImg: this.state.listImages.length - 1 })
        this.setState({
            currentIndexImg: this.state.currentIndexImg - 1,
        })
    }

    render() {
        if (!this.state.visible) return null;
        return (
            <div
                className={styles.fullScreenImageContainer}
                onKeyDown={this.onKeyDownExitFullScreenImg}
                tabIndex={-1}
                ref={this.containerRef}
            >
                <div className={styles.fullScreenImageSubContainer}>
                    <div className={styles.clearIconContainer} onClick={this.onClickClearIcon}>
                        <ClearIcon className={styles.clearIcon} />
                    </div>
                    <div className={styles.backIconContainer} onClick={this.onClickBack}>
                        <ArrowForwardIosIcon className={`${styles.navigateIcon} ${styles.backIcon}`} />
                    </div>
                    <img
                        className={styles.fullScreenImage}
                        src={this.state.listImages[this.state.currentIndexImg].url}
                        alt=''
                    />
                    <div className={styles.nextIconContainer} onClick={this.onClickNext}>
                        <ArrowForwardIosIcon className={styles.navigateIcon} />
                    </div>
                </div>
            </div>
        )
    }
}