import { Tabs } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import ChapterList from '../../components/ChapterList';
import NavBar from '../../components/NavBar';
import StoryIntroTab from '../../components/StoryIntroTab/index';
import StoryOverview from '../../components/StoryOverview';
import styles from './style.module.css'

function DetailPage({
    getstoryDetail,
    detail,
    detailLoading,
    getChapterList,
    newChapters,
    newChaptersLoading,
    chapterList,
    chapterListLoading,
}) {
    const { slug } = useParams();

    const storyDetailTab = React.useMemo(() => [
        {
            key: '1',
            label: <div className={`${styles.customLabel} ${styles.firstLabel}`}>Giới Thiệu</div>,
            children: <StoryIntroTab story={detail} chapters={newChapters} />,
        },
        {
            key: '2',
            label: <div className={styles.customLabel}>Danh Sách Chương</div>,
            children: <ChapterList />,
        },
        {
            key: '3',
            label: <div className={styles.customLabel}>Bình Luận</div>,
            children: `Content of Tab Pane 3`,
        },
    ], [newChapters, detail])

    React.useEffect(() => {
        getstoryDetail({ slug })
        getChapterList(slug, "newChapters", 1, 3, "createdAt", "-1")
        getChapterList(slug, "chapterList", 1, 3, "createdAt", "-1")
    }, [getChapterList, getstoryDetail, slug]);

    if (detailLoading || newChaptersLoading) return null
    return (
        <div className={styles.detailPageContainer}>
            <Header />
            <NavBar />
            <div className={`${styles.detailPage} resolution`}>
                <StoryOverview story={detail} />
                <Tabs defaultActiveKey="1" items={storyDetailTab} />
            </div>
        </div>
    )
}

export default DetailPage;