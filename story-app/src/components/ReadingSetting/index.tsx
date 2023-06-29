import React from 'react';

import styles from './style.module.scss'
import { CloseSquareOutlined } from '@ant-design/icons';
import { BackgroundColor, Font, Fontsize } from '../../constants/types/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import * as ActionTypes from "../../redux/actionTypes";

interface Props {
    onClickClose: () => void
}


export default function ReadingSetting({ onClickClose }: Props) {
    const [state, setState] = React.useState({
        defaultFontSize: Fontsize.S24
    })

    const dispatch = useDispatch();

    const theme = useSelector((state: RootState) => state.readingConfig.theme)

    const font = useSelector((state: RootState) => state.readingConfig.font)

    const fontSize = useSelector((state: RootState) => state.readingConfig.fontSize)

    const fontSizeList = React.useMemo(() => {
        return Object.values(Fontsize)
    }, [])

    const onClickColor = React.useCallback((item: BackgroundColor) => () => {
        dispatch({
            type: ActionTypes.SET_READING_CONFIG, payload: {
                key: "theme",
                value: item,
            }
        })
    }, [dispatch])

    const onClickFont = React.useCallback((item: Font) => () => {
        dispatch({
            type: ActionTypes.SET_READING_CONFIG, payload: {
                key: "font",
                value: item,
            }
        })
    }, [dispatch])

    const onClickMinus = React.useCallback(() => {
        const currentIndex = fontSizeList.findIndex((item) => item === fontSize)

        if (currentIndex === 0) return

        dispatch({
            type: ActionTypes.SET_READING_CONFIG, payload: {
                key: "fontSize",
                value: fontSizeList[currentIndex - 1],
            }
        })
    }, [dispatch, fontSize, fontSizeList])

    const onClickPlus = React.useCallback(() => {
        const currentIndex = fontSizeList.findIndex((item) => item === fontSize)

        if (currentIndex === fontSizeList.length - 1) return

        dispatch({
            type: ActionTypes.SET_READING_CONFIG, payload: {
                key: "fontSize",
                value: fontSizeList[currentIndex + 1],
            }
        })
    }, [dispatch, fontSize, fontSizeList])

    return (
        <div className={`${styles.readingSettingContainer} column`} style={{ backgroundColor: theme }}>
            <div className='header-container'>
                <div className='header-label'>Tùy Chỉnh</div>
                <CloseSquareOutlined className='close-card' onClick={onClickClose} />
            </div>
            <div className='theme-container flex'>
                <div className={styles.labelStyle}>Theme</div>
                <div className='color-wrap flex'>
                    {Object.values(BackgroundColor).map((item) => {
                        const isSelected = theme === item

                        return (
                            <div
                                className='color-container'
                                key={item}
                                style={{ backgroundColor: item }}
                                data-selected={isSelected}
                                onClick={onClickColor(item)}
                            />
                        )
                    })}
                </div>
            </div>
            <div className='font-container flex'>
                <div className={styles.labelStyle}>Kiểu chữ</div>
                <div className='font-wrap flex'>
                    {Object.keys(Font).map((item) => {
                        const key = item as keyof typeof Font

                        const isSelected = font === Font[key]

                        return (
                            <div
                                className='font'
                                key={item}
                                style={{ fontFamily: Font[key] }}
                                data-selected={isSelected}
                                onClick={onClickFont(Font[key])}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='font-size-container flex'>
                <div className={styles.labelStyle}>Cỡ chữ</div>
                <div className='font-size-box flex center'>
                    <div className='change-size-box' onClick={onClickMinus}>A-</div>
                    <div className='font-size'>{fontSize}</div>
                    <div className='change-size-box' onClick={onClickPlus}>A+</div>
                </div>
            </div>
        </div>
    )
}