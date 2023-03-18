import { Chapter } from "@/constants/types/chapter";
import { ClockCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export const columns: ColumnsType<Chapter> = [
    {
        title: 'STT',
        dataIndex: 'numberOrder',
    },
    {
        title: 'Quyển',
        dataIndex: 'bookName',
    },
    {
        title: 'Chương',
        dataIndex: 'chapterNumber',
    },
    {
        title: 'Tên Chương',
        dataIndex: 'name',

    },
    {
        title: <ClockCircleOutlined />,
        dataIndex: 'createdAt',
    },
];