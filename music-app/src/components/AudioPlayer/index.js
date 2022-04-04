import React from 'react';
import styles from './style.module.css'
import Images from '../../assets'

import { musics } from '../../constants'
import { renderTime } from '../../utility';

const volumeWidth = 120;

function Audio2(props) {

    const audioRef = React.useRef();

    const [play, setPlay] = React.useState(false);

    const [mute, setMute] = React.useState(false);

    const [currentTime, setCurrentTime] = React.useState(0);

    const [duration, setDuration] = React.useState(0);

    const [volume, setVolume] = React.useState(0);

    function playMusic() {
        audioRef.current.play();
        setPlay(true)
    }

    function stopMusic() {
        audioRef.current.pause();
        setPlay(false)
    }

    function onLoadedMetadata() {
        setDuration(audioRef.current.duration)
    }

    function onTimeUpdate() {
        setCurrentTime(audioRef.current.currentTime)

        if (audioRef.current.currentTime === duration)

            setPlay(false)
    }

    function onMute() {
        audioRef.current.muted = !audioRef.current.muted
        setMute(audioRef.current.muted)
        // setVolume(audioRef.current.volume)
    }

    function onVolumeChange(event) {
        const rect = event.currentTarget.getBoundingClientRect();

        let currentVolume = event.clientX - rect.left

        if (currentVolume < 0) currentVolume = 0

        const muted = currentVolume === 0

        audioRef.current.muted = muted

        setMute(muted)

        setVolume(currentVolume)
        audioRef.current.volume = currentVolume / volumeWidth


    }

    function onSeek(event) {

        const rect = event.currentTarget.getBoundingClientRect();

        const clickPosition = event.clientX - rect.left

        const currentTime2 = (clickPosition / rect.width) * duration

        setCurrentTime(currentTime2)

        audioRef.current.currentTime = currentTime2

    }

    const timeFormat = renderTime(currentTime)

    const durationTimeFormat = renderTime(duration)

    const percent = (currentTime / duration) * 100

    const volumePercent = (volume / volumeWidth) * 100

    return (
        <div className={styles.player}>
            <div className={styles.cover}>
                <img className={styles.image} src={props.image} alt='' />
            </div>
            <div className={styles.buttonItem}>
                <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata} onTimeUpdate={onTimeUpdate}>
                    <source src={props.src} type={'audio/mpeg'} />
                </audio>
                <div className={styles.slider} onClick={onSeek}>
                    <div className={styles.currentTime} style={{ width: `${percent}%` }}></div>
                </div>
                <div className={styles.control}>
                    {play
                        ? <img src={Images.pause} className={styles.controlIcon} onClick={stopMusic} alt='' />
                        : <img src={Images.play} className={styles.controlIcon} onClick={playMusic} alt='' />}
                    <div className={styles.timeMusic}>{timeFormat} / {durationTimeFormat}</div>
                    <div className={styles.space} />

                    {mute
                        ? <img src={Images.mute} className={styles.controlIcon} onClick={onMute} alt='' />
                        : <img src={Images.volume} className={styles.controlIcon} onClick={onMute} alt='' />}

                    <div className={styles.volumeSlider} onClick={onVolumeChange} style={{ width: volumeWidth }}>
                        <div className={styles.currentVolumeSlider} style={{ width: `${volumePercent}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Audio2;