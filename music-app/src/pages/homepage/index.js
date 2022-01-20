import react, { useState } from 'react';
import classNames from 'classnames';

import styles from './style.module.css'
import MusicAlbumTitle from '../../components/MusicAlbumTitle';
import ButtonTabSelect from '../../components/ButtonTabSelect';
import MusicItemTitle from '../../components/MusicItemTitle';


function Home() {

    const [state, setState] = react.useState({
        musics: [
            {
                title: "Xuan dang ve",
                data: [
                    { id: 0, title: 'Music 1', author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg', },
                    { id: 1, title: 'Music 2', author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg' },
                    { id: 2, title: 'Music 3', author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg' },
                ]
            }
            ,
            {
                title: "Moi  cap nhat",
                data: [
                    { id: 0, title: 'Music 1', author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg', },
                    { id: 1, title: 'Music 2', author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg' },
                    { id: 2, title: 'Music 3', author: 'Tri Ngo', image: 'https://www.si.com/.image/t_share/MTc3NTc2OTI0NDgxMDcwNzAx/top100_dchorizontal.jpg' },
                ]
            }
        ],
        selectedItem: null
    });

    return (
        <div className={styles.container}>
            <div className={styles.sliderMusic}>Top TOp top</div>
            <div className={styles.bottomMusic}>
                <div className={styles.leftMusic}>
                    {state.musics.map((item, index) => <MusicAlbumTitle title={item.title} key={index} data={item.data} />)}
                    {state.musics.map((item, index) => <MusicItemTitle title={item.title} key={index} data={item.data} />)}
                </div>
                <div className={styles.rightMusic}>
                    {state.musics.map((item, index) => {
                        const isActive = state.selectedItem === item.title;
                        return <ButtonTabSelect
                            isActive={isActive}
                            title={item.title}
                            onClick={() => {
                                setState(prevState => ({ ...prevState, selectedItem: item.title }));
                            }} />
                    })}
                </div>

            </div>
        </div>
    )
}

export default Home;