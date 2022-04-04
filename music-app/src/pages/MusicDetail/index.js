import React from 'react';
import styles from './style.module.css'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { routes, constants } from '../../constants'
import images from '../../assets'
import MusicFunction from '../../components/MusicFunction';
import * as ActionTypes from '../../redux/actionTypes';
import Lyric from '../../components/Lyric';
import AudioPlayer from '../../components/AudioPlayer';
import SuggestMusic from '../../components/SuggestMusic';
import Loading from '../../components/Loading';

function MusicDetail(props) {

    const { slug } = useParams();

    const dispatch = useDispatch();

    const allSong = useSelector((state) => state.musics.allSong);

    const musicDetail = useSelector((state) => state.musics.musicDetail);

    const loadingDetail = useSelector((state) => state.musics.loadingDetail);

    const loadingAllSong = useSelector((state) => state.musics.loadingAllSong);

    const onClickItem = React.useCallback((item) => {

    }, []);


    React.useEffect(() => {
        dispatch({
            type: ActionTypes.GET_MUSICDETAIL,
            payload: slug
        });
        dispatch({ type: ActionTypes.GET_ALLSONG });
    }
        , [
            dispatch,
            slug
        ]);

    if (loadingDetail || loadingAllSong) {
        return (
            <div className={styles.loadingPos}>
                <Loading />
            </div>
        )
    }

    return (
        <div className={styles.musicContainer}>
            <div className={styles.currentMusic}>
                <div className={styles.musicsFolder}>
                    <a href={routes.HOME.path} className={styles.NgheNhac}>Nghe Nhạc &gt; </a>
                    <a href='google.com' className={styles.category}>{musicDetail.categories.map((item, index) => item.title)} &gt; </a>
                    <a href='google.com' className={styles.author}>{musicDetail.author}</a>
                </div>
                <div className={styles.musicTitle}>
                    <div className={styles.title}>{musicDetail.title} - </div>
                    <a href='google.com' className={styles.author2}>{musicDetail.author}</a>
                    <img src={images.videoIcon} className={styles.videoIcon} />
                    <div className={styles.viewsContainer}>
                    </div>
                    <img src={images.headphone} className={styles.headphone} />
                    <div>{musicDetail.views}</div>
                </div>
                <AudioPlayer image={musicDetail.image} src={musicDetail.source} />
                <MusicFunction />
                <Lyric title={musicDetail.title} author={musicDetail.author} lyric={musicDetail.lyric} />

            </div>
            <div className={styles.suggestMusic}>
                <div className={styles.continueMusic}>Nghe Tiếp</div>
                {allSong.map((item, index) => <SuggestMusic key={index} title={item.title} views={item.views} author={item.author} slug={item.slug} onClickItem={onClickItem} />)}
            </div>
        </div>

    )
}

export default MusicDetail;