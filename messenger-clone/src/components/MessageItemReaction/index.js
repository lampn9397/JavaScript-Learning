import * as React from 'react';
import PropTypes from 'prop-types';
import images from '../../assets';
import AddIcon from '@mui/icons-material/Add';

import styles from './style.module.css'
import { REACTION_TYPES } from '../../constants';

export default function MessageItemReaction({ className, popUpClassName, onReaction }) {

    const [state, setState] = React.useState({
        popUpEmoji: false,
    })

    const onClickGraySmile = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, popUpEmoji: !prevState.popUpEmoji }))
    }, [])

    const onClickReaction = React.useCallback((emojiType) => () => {
        onReaction(emojiType)
    }, [onReaction])

    return (
        <div className={`${styles.reactEmoji} ${className}`}>
            {state.popUpEmoji && (
                <div className={`${styles.popUpEmoji} ${popUpClassName}`}>
                    <img src={images.like} alt='' className={`${styles.emojis}`} onClick={onClickReaction(REACTION_TYPES.LIKE)} />
                    <img src={images.love} alt='' className={`${styles.emojis}`} onClick={onClickReaction(REACTION_TYPES.LOVE)} />
                    <img src={images.angry} alt='' className={`${styles.emojis}`} onClick={onClickReaction(REACTION_TYPES.ANGRY)} />
                    <img src={images.sad} alt='' className={`${styles.emojis}`} onClick={onClickReaction(REACTION_TYPES.SAD)} />
                    <div className={`${styles.moreEmojis}`}>
                        <AddIcon />
                    </div>
                </div>
            )}
            <img src={images.graySmile} alt='' className={`${styles.graySmile}`} onClick={onClickGraySmile} />
        </div>
    )
}

MessageItemReaction.propTypes = {
    className: PropTypes.string,
    popUpClassName: PropTypes.string,
    onReaction: PropTypes.func,
}

MessageItemReaction.defaultProps = {
    className: '',
    popUpClassName: '',
    onReaction: () => undefined,
}