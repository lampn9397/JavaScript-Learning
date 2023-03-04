import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import StoryOverview from '../../components/StoryOverview';
import styles from './style.module.css'

function DetailPage({
    getstoryDetail,
    detail,
    detailLoading,
}) {
    const { slug } = useParams();

    React.useEffect(() => {
        getstoryDetail({ slug })
    }, [getstoryDetail, slug]);

    if (detailLoading) return null
    return (
        <div className={styles.detailPageContainer}>
            <Header />
            <NavBar />
            <div className={`${styles.detailPage} resolution`}>
                <StoryOverview story={detail} />
            </div>
        </div>
    )
}

export default DetailPage;