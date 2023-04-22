import { Tabs } from 'antd';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import ChapterList, { ChapterListSort } from '../../components/ChapterList';
import NavBar from '../../components/NavBar';
import StoryIntroTab from '../../components/StoryIntroTab/index';
import StoryOverview from '../../components/StoryOverview';
import styles from './style.module.css'
import type { ReduxProps } from '.';
import useQuery from '../../hooks/useQuery'
import StoryCommentCard from '../../components/StoryCommentCard';
import { pageLimit } from '../../constants';
import RatingCard from '../../components/RatingCard';

export interface DetailPageProps extends ReduxProps {
}

function DetailPage({
    user,
    getstoryDetail,
    detail,
    detailLoading,
    getChapterList,
    newChapters,
    newChaptersLoading,
    chapterList,
    chapterListLoading,
    getStoryByAuthor,
    storyByAuthorList,
    storyByAuthorListLoading,
    getComments,
    commentList,
    commentListLoading,
    getRatings,
    ratingList,
    ratingListLoading,

}: DetailPageProps) {
    const { slug }: any = useParams();

    const query = useQuery();

    let history = useHistory();

    const location = useLocation();

    const updateQueryString = React.useCallback((params: any) => {
        for (const key in params) {
            query.set(key, `${params[key]}`)
        }

        history.push({
            pathname: location.pathname,
            search: `?${query.toString()}`
        })
    }, [history, location.pathname, query])

    const onChangePagination = React.useCallback((page: number, pageSize: number) => {
        updateQueryString({ page, limit: pageSize })
    }, [updateQueryString])

    const onChangeSort = React.useCallback((sort: ChapterListSort) => {
        updateQueryString(sort)
    }, [updateQueryString])

    const createdAtSort = React.useMemo(() => {
        let createdAtSortValue: string = query.get("createdAt") || "-1"

        return createdAtSortValue
    }, [query])

    const currentPage = React.useMemo(() => {
        let currentPageValue: number | string = query.get("page") || 1

        if (currentPageValue) {
            currentPageValue = +currentPageValue

            if (isNaN(currentPageValue)) {
                currentPageValue = 1
            }
        }

        return currentPageValue as number
    }, [query])

    const pageSize = React.useMemo(() => {
        let pageSizeValue: number | string = query.get("limit") || 50

        if (pageSizeValue) {
            pageSizeValue = +pageSizeValue

            if (isNaN(pageSizeValue)) {
                pageSizeValue = 50
            }
        }

        return pageSizeValue as number
    }, [query])

    const storyDetailTab = React.useMemo(() => {
        return [
            {
                key: '1',
                label: <div className={`${styles.customLabel} ${styles.firstLabel}`}>Giới Thiệu</div>,
                children: <StoryIntroTab story={detail} chapters={newChapters} storyByAuthor={storyByAuthorList[0]} />,
            },
            {
                key: '2',
                label: <div className={styles.customLabel}>Danh Sách Chương</div>,
                children: <ChapterList
                    chapters={chapterList}
                    story={detail}
                    pageSize={pageSize}
                    onChangePagination={onChangePagination}
                    page={currentPage}
                    loading={chapterListLoading}
                    onChangeSort={onChangeSort}
                    storyByAuthor={storyByAuthorList[0]}
                />,
            },
            {
                key: '3',
                label: <div className={styles.customLabel}>Bình Luận</div>,
                children: <StoryCommentCard
                    commentList={commentList}
                    story={detail}
                    user={user}
                    getComments={getComments}
                />,
            },
            {
                key: '4',
                label: <div className={styles.customLabel}>Đánh Giá</div>,
                children: <RatingCard
                    getRatings={getRatings}
                    ratingList={ratingList}
                    story={detail}
                    user={user}
                />,
            },
        ]
    }, [
        detail,
        newChapters,
        storyByAuthorList,
        chapterList,
        pageSize,
        onChangePagination,
        currentPage,
        chapterListLoading,
        onChangeSort,
        commentList,
        user,
        getComments,
        getRatings,
        ratingList
    ])

    React.useEffect(() => {
        getstoryDetail({ slug })
        getChapterList(slug, "newChapters", 1, 3, "createdAt", "-1")
    }, [getChapterList, getstoryDetail, slug]);

    React.useEffect(() => {
        getChapterList(slug, "chapterList", currentPage, pageSize, "createdAt", createdAtSort)
    }, [getChapterList, slug, currentPage, pageSize, createdAtSort]);

    React.useEffect(() => {
        if (!detail) return
        getStoryByAuthor(detail.author._id, slug)
    }, [detail, getStoryByAuthor, slug]);

    React.useEffect(() => {
        if (!detail) return
        getComments(detail._id, 1, pageLimit)
        getRatings(detail._id, 1, pageLimit)
    }, [detail, getComments, getRatings]);

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