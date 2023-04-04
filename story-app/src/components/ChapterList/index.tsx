import React from 'react';
import { Checkbox, Pagination, Table } from 'antd';
import { ClockCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from 'antd/es/table';
import 'moment/locale/vi';
import moment from 'moment';
import { Link } from "react-router-dom";
import { publicRoutes } from "../../constants";

import type { Chapter } from '@/constants/types/chapter';
import styles from './style.module.scss'
import { Story } from '@/constants/types/story';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import AuthorCard from '../AuthorCard';

interface Props {
    chapters: Chapter[],
    story: Story,
    page: number,
    pageSize: number,
    loading: boolean,
    storyByAuthor: Story,
    onChangeSort: (sort: ChapterListSort) => void,
    onChangePagination: (page: number, pageSize: number) => void,
}
export interface ChapterListSort {
    createdAt: number,
}

export default function ChapterList({ story, chapters, page, pageSize, storyByAuthor, loading, onChangePagination, onChangeSort }: Props) {
    const onChange = React.useCallback((e: CheckboxChangeEvent) => {
        const checked = e.target.checked

        const createdAt = checked ? -1 : 1

        onChangeSort({ createdAt })
    }, [onChangeSort]);

    const renderTableTitle = React.useCallback(() => {
        return (
            <div className='flex'>
                <Checkbox onChange={onChange}>Chương mới lên trước</Checkbox>
                <Pagination
                    showQuickJumper
                    current={page}
                    total={story.totalChapter}
                    pageSize={pageSize}
                    pageSizeOptions={[50, 100, 1]}
                    showSizeChanger={true}
                    onChange={onChangePagination}
                />
            </div>
        )
    }, [onChange, onChangePagination, page, pageSize, story.totalChapter])

    const columns: ColumnsType<Chapter> = [
        {
            title: 'STT',
            render: (text, item, index) => index + 1
        },
        {
            title: 'Quyển',
            dataIndex: 'bookNumber',
            render: (text) => `Quyển ${text}`
        },
        {
            title: 'Chương',
            dataIndex: 'chapterNumber',
            render: (text, item) => (
                <Link
                    to={publicRoutes.ChapterDetail(story.slug, item.chapterNumber).path}
                    className="custom-link"
                >
                    Chương {text}
                </Link>
            )
        },
        {
            title: 'Tên Chương',
            dataIndex: 'name',
            width: "410px",
            render: (text, item) => (
                <Link
                    to={publicRoutes.ChapterDetail(story.slug, item.chapterNumber).path}
                    className="custom-link"
                >
                    {text}
                </Link>
            )
        },
        {
            title: <ClockCircleOutlined />,
            dataIndex: 'createdAt',
            render: (text) => moment(text).format("HH:mm DD/MM"),
            align: "center"
        },
    ];
    return (
        <div className={`${styles.chapterListContainer} flex`}>
            <div className='column-container'>
                <Table
                    columns={columns}
                    dataSource={chapters}
                    loading={loading}
                    rowKey={(item) => item._id}
                    title={renderTableTitle}
                />
            </div>
            <AuthorCard author={story.author} storyByAuthor={storyByAuthor} />
        </div>
    )
}