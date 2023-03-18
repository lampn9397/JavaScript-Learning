import React from 'react';
import { Table } from 'antd';

import type { Chapter } from '@/constants/types/chapter';
import styles from './style.module.scss'
import { columns } from './tableConfig';

interface Props {
    chapters: Chapter[],
    page: number,
    onChangePagination: () => void,
}

export default function ChapterList({ chapters, page, onChangePagination }: Props) {
    return (
        <div className={`${styles.chapterListContainer} flex`}>
            <Table
                columns={columns}
                dataSource={chapters}
                pagination={{
                    position: ["topRight"],
                    current: page,
                    total: 100,
                    pageSize: 50,
                    pageSizeOptions: [50, 100],
                    onChange: onChangePagination
                }}
            />
        </div>
    )
}