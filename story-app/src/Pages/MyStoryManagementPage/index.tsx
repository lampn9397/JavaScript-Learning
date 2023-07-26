import React from 'react';

import styles from './style.module.scss'
import AccountLayout from '../../components/ProfileLayout';
import { Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Story } from '../../constants/types/story';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import * as ActionTypes from '../../redux/actionTypes'

export default function MyStoryManagementPage() {

    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user)

    const userStoryList = useSelector((state: RootState) => state.story.userStoryList)

    console.log(userStoryList)

    React.useEffect(() => {
        if (user) {
            dispatch({
                type: ActionTypes.GET_USER_STORY_LIST,
                payload: {
                    storyId: user._id,
                }
            })
        }
    }, [dispatch, user])

    const columns: ColumnsType<Story> = [
        {
            title: 'Tên truyện',
            render: (text, item, index) => item.name
        },
    ];

    // const renderTableTitle = React.useCallback(() => {
    //     return (
    //         <div className='flex'>
    //             <Pagination
    //                 showQuickJumper
    //                 current={page}
    //                 total={story.totalChapter}
    //                 pageSize={pageSize}
    //                 pageSizeOptions={[50, 100, 1]}
    //                 showSizeChanger={true}
    //                 onChange={onChangePagination}
    //             />
    //         </div>
    //     )
    // }, [onChange, onChangePagination, page, pageSize, story.totalChapter])

    return (
        <AccountLayout>
            <div className={`${styles.myStoryManagementPageContainer} column`}>
                <Table
                    columns={columns}
                    dataSource={userStoryList.stories}
                    rowKey={(item) => item._id}
                // title={renderTableTitle}
                />
            </div >
        </AccountLayout>
    )

}