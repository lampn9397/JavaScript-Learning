import React from 'react';

import styles from './style.module.scss'
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Story } from '../../constants/types/story';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import * as ActionTypes from '../../redux/actionTypes'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { publicRoutes } from '../../constants';
import { PlusOutlined } from '@ant-design/icons';
import useQuery from '../../hooks/useQuery';
import ProfileLayout from '../../components/ProfileLayout';

export default function MyStoryManagementPage() {

    const dispatch = useDispatch();

    const query = useQuery();

    let history = useHistory();

    const user = useSelector((state: RootState) => state.auth.user)

    const location = useLocation();

    const userStoryList = useSelector((state: RootState) => state.story.userStoryList)

    const stories = userStoryList?.stories ?? []

    const updateQueryString = React.useCallback((params: any) => {
        for (const key in params) {
            query.set(key, `${params[key]}`)
        }

        history.push({
            pathname: location.pathname,
            search: `?${query.toString()}`
        })
    }, [history, location.pathname, query])

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

    const onChangePagination = React.useCallback((page: number, pageSize: number) => {
        updateQueryString({ page, limit: pageSize })
    }, [updateQueryString])

    React.useEffect(() => {
        if (user) {
            dispatch({
                type: ActionTypes.GET_USER_STORY_LIST,
                payload: {
                    storyId: user._id,
                    page: currentPage,
                    limit: pageSize,
                }
            })
        }
    }, [currentPage, dispatch, pageSize, user])

    const columns: ColumnsType<Story> = [
        {
            title: 'Tên truyện',
            render: (text, item, index) => <Link className={`${styles.clickAble}`} to={publicRoutes.StoryDetail(item.slug).path}>{item.name}</Link>
        },
        {
            title: <div className='center'>Sửa</div>,
            render: () => <Link className={`${styles.clickAble} center`} to={publicRoutes.UpdateMyStoryPage().path}>Sửa</Link>
        },
        {
            title: <div className='center'>Quản lý chương</div>,
            render: (text, item) => <Link className={`${styles.clickAble} center`} to={publicRoutes.StoryChapterManagementPage(item._id).path}>DSC</Link>
        },
        {
            title: <div className='center'>Thêm Chương</div>,
            render: (text, item) => <Link className={`${styles.clickAble} center`} to={publicRoutes.CreateStoryChapter(item._id).path}><PlusOutlined /></Link>
        },

    ];

    return (
        <ProfileLayout>
            <div className={`${styles.myStoryManagementPageContainer} column`}>
                <Table
                    columns={columns}
                    dataSource={stories}
                    rowKey={(item) => item._id}
                    pagination={{
                        showQuickJumper: true,
                        current: currentPage,
                        total: userStoryList?.totalStory ?? 0,
                        pageSize: pageSize,
                        pageSizeOptions: [50, 100, 1],
                        showSizeChanger: true,
                        onChange: onChangePagination,
                    }}
                />
            </div >
        </ProfileLayout>
    )

}