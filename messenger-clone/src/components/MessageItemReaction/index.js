import * as React from 'react';
import PropTypes from 'prop-types';
import images from '../../assets';
import AddIcon from '@mui/icons-material/Add';
import classNames from 'classnames';

import styles from './style.module.css'
import { REACTION_TYPES } from '../../constants';
import { t } from 'i18next';

export default function MessageItemReaction({
    className,
    popUpClassName,
    onReaction,
    onClickShowPopUp,
    reactionPopUpVisible,
    myReaction,
}) {

    const onClickReaction = React.useCallback((emojiType) => () => {
        onReaction(emojiType)
    }, [onReaction])

    return (
        <div className={classNames({
            [styles.reactEmoji]: true,
            [className]: true,
            [styles.popUpEmojClass]: reactionPopUpVisible,
        })}
            onClick={onClickShowPopUp}
        >
            {reactionPopUpVisible && (
                <div className={`${styles.popUpEmoji} ${popUpClassName}`}>
                    {[REACTION_TYPES.LIKE, REACTION_TYPES.LOVE, REACTION_TYPES.ANGRY, REACTION_TYPES.SAD].map((item) => (
                        <div className={classNames({
                            [styles.reactionContainer]: true,
                            [styles.isMyReaction]: myReaction?.type === item,
                        })}>
                            <img src={images[item.toLowerCase()]} alt='' className={styles.emojis} onClick={onClickReaction(item)} />
                        </div>
                    ))}
                    <div className={`${styles.moreEmojis}`}>
                        <AddIcon />
                    </div>
                </div>
            )}
            <img src={images.graySmile} alt='' className={`${styles.graySmile}`} />
        </div>
    )
}

MessageItemReaction.propTypes = {
    className: PropTypes.string,
    popUpClassName: PropTypes.string,
    onReaction: PropTypes.func,
    onClickShowPopUp: PropTypes.func,
    reactionPopUpVisible: PropTypes.bool,
    myReaction: PropTypes.instanceOf(Object),
}

MessageItemReaction.defaultProps = {
    className: '',
    popUpClassName: '',
    onReaction: () => undefined,
    onClickShowPopUp: () => undefined,
    reactionPopUpVisible: false,
    myReaction: null,
}