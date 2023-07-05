import React from 'react';

import styles from './style.module.scss'
import Header from '../../components/Header';
import { ReduxProps } from '.';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { pageLimit, publicRoutes } from '../../constants';
import ReadingConfig from '../../components/ReadingConfig';
import { getChapter, getReadingProgress, saveReadingProgress } from '../../utils/chapter';
import classNames from 'classnames';
import moment from 'moment';
import StoryCommentCard from '../../components/StoryCommentCard';


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
    getComments,
    commentList,
    commentListLoading,
    getstoryDetail,
    detail,
    detailLoading,
    user,

}: Props) {
    const { storySlug, numberOrder }: any = useParams();

    const commentRef = React.useRef<HTMLDivElement>(null)

    let history = useHistory();

    const chapterNumber = React.useMemo(() => {
        return (numberOrder as string).replace("chuong-", "")
    }, [numberOrder])

    const prevChapter = getChapter(false, +chapterNumber, chapterList)

    const nextChapter = getChapter(true, +chapterNumber, chapterList)

    React.useEffect(() => {
        getstoryDetail({ slug: storySlug })
    }, [getstoryDetail, storySlug]);

    React.useEffect(() => {
        if (!detail) return
        getComments(detail._id, 1, pageLimit)
    }, [detail, getComments]);

    React.useEffect(() => {
        getChapterDetail(storySlug, chapterNumber)
    }, [chapterNumber, getChapterDetail, storySlug])

    React.useEffect(() => {
        getChapterList(storySlug, "chapterList", 1, 999999, "chapterNumber", "1")
    }, [getChapterList, storySlug]);

    React.useEffect(() => {
        if (!chapterDetail || !detail) return

        const readingProgress = getReadingProgress(storySlug)

        if (readingProgress?.progress) {
            window.scrollTo({ top: readingProgress.progress.y })
        } else {
            saveReadingProgress(storySlug, +chapterNumber, 0)
        }

        const onScroll = () => {
            saveReadingProgress(storySlug, +chapterNumber, window.scrollY)
        }

        window.addEventListener("scroll", onScroll)

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [chapterDetail, chapterNumber, detail, storySlug])

    const onClickCommentIcon = React.useCallback(() => {
        commentRef.current?.scrollIntoView()
    }, [])

    const onClickPrevChapter = React.useCallback(() => {
        if (!prevChapter?.numberOrder) return

        history.push(publicRoutes.ChapterDetail(storySlug, prevChapter?.numberOrder).path)
    }, [history, prevChapter?.numberOrder, storySlug])

    const onClickNextChapter = React.useCallback(() => {
        if (!nextChapter?.numberOrder) return

        history.push(publicRoutes.ChapterDetail(storySlug, nextChapter?.numberOrder).path)
    }, [history, nextChapter?.numberOrder, storySlug])

    return (
        <div className={`${styles.DetailChapterPageContainer} column`}>
            <Header />
            {chapterDetailLoading ? (
                <Spin indicator={<LoadingOutlined style={{ color: "white" }} />} />
            ) : (
                <div className='reading-screen-container'>
                    <ReadingConfig onClickCommentIcon={onClickCommentIcon} />
                    <div className='resolution center column'>
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
                                <div className='created-at'>Ngày đăng : {moment(chapterDetail.createdAt).format("hh:mm DD-MM-YYYY")}</div>
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
                            })}
                                onClick={onClickPrevChapter}
                            >
                                <LeftOutlined />
                                <div>Chương trước</div>
                            </div>
                            <div className='seperator'> </div>
                            <div className={classNames({
                                "flex": true,
                                "first-chapter-hover": nextChapter,
                                "first-chapter": !nextChapter,
                                "flex-fill": true,
                                "next-container": true,
                            })}
                                onClick={onClickNextChapter}
                            >
                                <div>Chương tiếp</div>
                                <RightOutlined />
                            </div>
                        </div>
                        <div ref={commentRef}>
                            <StoryCommentCard
                                commentList={commentList}
                                story={detail}
                                user={user}
                                getComments={getComments}
                                containerClassname='containerClassname'
                            />
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )

}