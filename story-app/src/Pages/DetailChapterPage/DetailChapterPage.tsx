import React from 'react';

import styles from './style.module.scss'
import Header from '../../components/Header';
import { ReduxProps } from '.';
import { Link, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { publicRoutes } from '../../constants';
import ReadingConfig from '../../components/ReadingConfig';


interface Props extends ReduxProps { }

export default function DetailChapterPage({
    getChapterDetail,
    chapterDetail,
    chapterDetailLoading,
    getChapterList,
    chapterList,
    chapterListLoading,
    theme,
    font,
    fontSize,
}: Props) {
    const { storySlug, numberOrder }: any = useParams();

    const chapterNumber = React.useMemo(() => {
        return (numberOrder as string).replace("chuong-", "")
    }, [numberOrder])

    React.useEffect(() => {
        getChapterDetail(storySlug, chapterNumber)
    }, [chapterNumber, getChapterDetail, storySlug])

    React.useEffect(() => {
        getChapterList(storySlug, "chapterList", 1, 999999, "chapterNumber", "1")
    }, [getChapterList, storySlug]);

    return (
        <div className={`${styles.DetailChapterPageContainer} column`}>
            <Header />
            {chapterDetailLoading ? (
                <Spin indicator={<LoadingOutlined style={{ color: "white" }} />} />
            ) : (
                <div className='reading-screen-container'>
                    <ReadingConfig />
                    <div className='resolution center'>
                        <div className='reading-screen' style={{ backgroundColor: theme, fontFamily: font }}>
                            <div className='chapter-header center column'>
                                <div className='story-name'>{chapterDetail.story.name}</div>
                                <div className='chapter-number'>Chương {chapterDetail.chapterNumber} : {chapterDetail.name}</div>
                                <div className='uploader-container flex'>
                                    <div>Người đăng :</div>
                                    <Link className='uploader' to={publicRoutes.UserPage(chapterDetail.uploader._id).path}>
                                        {chapterDetail.uploader.name}
                                    </Link>
                                </div>
                                <div className='created-at'>Ngày đăng : {chapterDetail.createdAt}</div>
                            </div>
                            <div className='chapter-content-container' style={{ fontSize: +fontSize }}>
                                {chapterDetail.content}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )

}