import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";

import styles from './style.module.css'
import MusicAlbumTitle from '../../components/MusicAlbumTitle';
import ButtonTabSelect from '../../components/ButtonTabSelect';
import MusicItemTitle from '../../components/MusicItemTitle';
import * as ActionTypes from '../../redux/actionTypes';
// import AppNavigationBar from '../../components/AppNavigationBar';
// import { NavBarData } from '../../constants';
import Rank from '../../components/Rank';
import SongRankList from '../../components/SongRankList';
import Loading from '../../components/Loading';
import SlideShow from '../../components/SlideShow';


function Home() {

    const dispatch = useDispatch();


    const [state, setState] = React.useState({
        selectedItem: null
    });

    const musics = useSelector((state) => state.musics.musicList);

    const musicRank = useSelector((state) => state.musicRank.musicRankList);

    const loading = useSelector((state) => state.musics.loading);

    const slideSong = useSelector((state) => state.musics.slideSong);

    const slideLoading = useSelector((state) => state.musics.slideLoading);

    const onClickItem = React.useCallback((item) => {

    }, []);

    React.useEffect(() => {
        dispatch({ type: ActionTypes.GET_MUSICS });
        dispatch({ type: ActionTypes.GET_MUSICRANK });
        dispatch({ type: ActionTypes.GET_HOTSONGFORSLIDE });
    }, [dispatch]);

    React.useEffect(() => {
        if (musicRank.length > 0) {
            setState(prevState => ({ ...prevState, selectedItem: musicRank[0]._id }));
        }
    }, [musicRank]);

    if (loading || slideLoading) {
        return (
            <div className={styles.loadingPos}>
                <Loading />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {/* <AppNavigationBar /> */}
            <div className={styles.sliderMusic}>
                <SlideShow slideSong={slideSong} />
            </div>
            <div className={styles.bottomMusic}>
                <div className={styles.leftMusic}>
                    {musics.map((item, index) => <MusicAlbumTitle title={item.title} key={index} data={item.songs} onClickItem={onClickItem} />)}
                    {musics.map((item, index) => <MusicItemTitle title={item.title} key={index} data={item.songs} />)}
                </div>
                <div className={styles.rightMusic}>
                    <Rank />
                    <div className={styles.btnSelect}>
                        {musicRank.map((item, index) => {
                            const isActive = state.selectedItem === item._id;
                            return <ButtonTabSelect
                                key={index}
                                index={index}
                                isActive={isActive}
                                title={item.name}
                                onClick={() => {
                                    setState(prevState => ({ ...prevState, selectedItem: item._id }));
                                }} />
                        })}
                    </div>
                    <div className={styles.SongRankContainer}>
                        {musicRank.map((item, index) => {
                            const isActive = state.selectedItem === item._id;

                            if (!isActive) return null

                            return <SongRankList item={item} key={index} />
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;