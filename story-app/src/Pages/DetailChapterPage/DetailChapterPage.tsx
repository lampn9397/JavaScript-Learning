import React from 'react';

import styles from './style.module.scss'
import Header from '../../components/Header';
import { ReduxProps } from '.';
import { Link, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { publicRoutes } from '../../constants';
import ReadingConfig from '../../components/ReadingConfig';
import { getChapter } from '../../utils/chapter';
import classNames from 'classnames';


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

    const number = React.useMemo(() => {
        return (numberOrder as string).replace("chuong-", "")
    }, [numberOrder])

    const prevChapter = getChapter(false, +number, chapterList)

    const nextChapter = getChapter(true, +number, chapterList)


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
                        <div className='control-chapter-container center' style={{ backgroundColor: theme }}>
                            <div className={classNames({
                                "flex": true,
                                "first-chapter-hover": prevChapter,
                                "first-chapter": !prevChapter,
                                "prevChapter-container": true,
                                "flex-fill": true,
                            })}>
                                <LeftOutlined />
                                {prevChapter?.numberOrder ? (
                                    <Link to={publicRoutes.ChapterDetail(storySlug, prevChapter?.numberOrder).path}>Chương trước</Link>
                                ) : (
                                    <div>Chương trước</div>
                                )}
                            </div>
                            <div className='seperator'> </div>
                            <div className={classNames({
                                "flex": true,
                                "first-chapter-hover": nextChapter,
                                "first-chapter": !nextChapter,
                                "flex-fill": true,
                                "next-container": true,
                            })}>
                                {nextChapter?.numberOrder ? (
                                    <Link to={publicRoutes.ChapterDetail(storySlug, nextChapter?.numberOrder).path}>Chương tiếp</Link>
                                ) : (
                                    <div>Chương tiếp</div>
                                )}
                                <RightOutlined />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )

}