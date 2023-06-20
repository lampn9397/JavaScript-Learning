import React from 'react';

import styles from './style.module.scss'
import { Link, useParams } from 'react-router-dom';
import { publicRoutes } from '../../constants';
import { getChapter } from '../../utils/chapter';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CloseSquareOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Chapter } from '@/constants/types/chapter';

interface Props {
    onClickClose: () => void,
}

export default function ChapterListCard({ onClickClose }: Props) {
    const { storySlug, numberOrder }: any = useParams();

    const chapterList: Chapter[] = useSelector((state: RootState) => state.chapter.chapterList)

    const number = React.useMemo(() => {
        return (numberOrder as string).replace("chuong-", "")
    }, [numberOrder])

    const prevChapter = getChapter(false, +number, chapterList)

    const nextChapter = getChapter(true, +number, chapterList)

    const bookList = React.useMemo(() => {
        const list: any[] = []

        chapterList.forEach((item) => {
            const listItemIndex = list.findIndex((listItem) => listItem.bookNumber === item.bookNumber)

            if (listItemIndex !== -1) {
                list[listItemIndex].chapters.push(item)
            } else {
                list.push({
                    bookNumber: item.bookNumber,
                    bookName: item.bookName,
                    chapters: [item]
                })
            }
        })

        return list
    }, [chapterList])

    return (
        <div className={`${styles.chapterListCardContainer}`} onClick={(e) => e.preventDefault()}>
            <div className='header-container flex'>
                <div className={classNames({
                    "flex": true,
                    "first-chapter-hover": prevChapter,
                    "first-chapter": !prevChapter,
                })}>
                    <LeftOutlined />
                    {prevChapter?.numberOrder ? (
                        <Link to={publicRoutes.ChapterDetail(storySlug, prevChapter?.numberOrder).path}>Chương trước</Link>
                    ) : (
                        <div>Chương trước</div>
                    )}
                </div>
                <div className={classNames({
                    "flex": true,
                    "first-chapter-hover": nextChapter,
                    "first-chapter": !nextChapter
                })}>
                    {nextChapter?.numberOrder ? (
                        <Link to={publicRoutes.ChapterDetail(storySlug, nextChapter?.numberOrder).path}>Chương tiếp</Link>
                    ) : (
                        <div>Chương tiếp</div>
                    )}
                    <RightOutlined />
                </div>
                <CloseSquareOutlined className='close-card' onClick={onClickClose} />
            </div>
            {bookList.map((bookItem, index) => (
                <div className='content-container'>
                    <div className={classNames({
                        "book-number": true,
                        "long-content": true,
                        "non-border": index === bookList.length - 1
                    })}
                        key={bookItem._id}>
                        Quyển {bookItem.bookNumber} : {bookItem.bookName}
                    </div>
                    <div className='chapter-container flex'>
                        {bookItem.chapters.map((chapterItem: Chapter, index: any) => (
                            <Link className={classNames({
                                "chapter": true,
                                "long-content": true,
                                "selected-chapter": +number === chapterItem.numberOrder
                            })}
                                key={chapterItem._id}
                                to={publicRoutes.ChapterDetail(storySlug, chapterItem.numberOrder).path}
                            >
                                Chương {chapterItem.chapterNumber} : {chapterItem.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))
            }
        </div >
    )
}