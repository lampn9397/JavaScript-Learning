import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import ProfileLayout from '../../components/ProfileLayout';
import images from '../../assets';
import useQuery from '../../hooks/useQuery';
import Table, { ColumnsType } from 'antd/es/table';
import { Chapter } from '../../constants/types/chapter';
import { publicRoutes } from '../../constants';
import { getQueryStringValue, updateQueryString } from '../../utils/query';

interface Props extends ReduxProps { }

interface State {
}

export default function ChapterManagementPage({
    getstoryDetail,
    detail,
    chapterList,
    getChapterList,
}: Props) {

    const { storyId }: any = useParams();

    const query = useQuery();

    let history = useHistory();

    const location = useLocation();

    const createdAtSort = React.useMemo(() => {
        return getQueryStringValue(query, "createdAt", "-1")
    }, [query])

    const currentPage = React.useMemo(() => {
        return getQueryStringValue(query, "page", 1)
    }, [query])


    const pageSize = React.useMemo(() => {
        return getQueryStringValue(query, "limit", 50)
    }, [query])

    const onChangePagination = React.useCallback((page: number, pageSize: number) => {
        updateQueryString(query, history, location, { page, limit: pageSize })
    }, [history, location, query])

    const columns: ColumnsType<Chapter> = [
        {
            title: <div className='center'>STT</div>,
            render: (text, item, index) => <div className={`center`}>{item.numberOrder}</div>,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.numberOrder - b.numberOrder,
        },
        {
            title: <div className='center'>Chương</div>,
            render: (text, item, index) => <Link className={`${styles.clickAble} center`} to={publicRoutes.ChapterDetail(detail?.slug, item.numberOrder).path}>Chương {item.chapterNumber}</Link>
        },
        {
            title: <div className='center'>Quyển</div>,
            render: (text, item, index) => <div className={`center`}>{item.bookNumber}</div>
        },
        {
            title: <div className='center'>Tên Chương</div>,
            render: (text, item, index) => <Link className={`${styles.clickAble} center`} to={publicRoutes.ChapterDetail(detail?.slug, item.numberOrder).path}>{item.name}</Link>
        },
        {
            title: <div className='center'>Sửa</div>,
            render: (text, item, index) => <Link className={`${styles.clickAble} center`} to={publicRoutes.UpdateStoryChapter(storyId, item.numberOrder).path}>Sửa</Link>
        },
    ];

    React.useEffect(() => {
        getstoryDetail({ slug: storyId })
        getChapterList(storyId, "chapterList", currentPage, pageSize, "createdAt", createdAtSort)
    }, [createdAtSort, currentPage, getChapterList, getstoryDetail, pageSize, storyId])

    return (
        <ProfileLayout>
            <div className={`${styles.storyChapterManagementPageContainer} column`}>
                <div className='header-container flex'>
                    <img alt="" className='writing-book-icon' src={images.writingBook} />
                    <div className='header-label'>Danh sách chương truyện : {detail?.name}</div>
                </div>
                <div className='body-container column'>
                    <Table
                        columns={columns}
                        dataSource={chapterList}
                        rowKey={(item) => item._id}
                        pagination={{
                            showQuickJumper: true,
                            current: currentPage,
                            total: detail?.totalChapter,
                            pageSize: pageSize,
                            pageSizeOptions: [50, 100, 1],
                            showSizeChanger: true,
                            onChange: onChangePagination,
                        }}
                    />
                </div>
            </div >
        </ProfileLayout>
    )

}