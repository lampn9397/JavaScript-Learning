import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

import styles from './style.module.css'

export const items = [
    {
        label: 'Thể Loại',
        key: '0',
        icon: <MenuOutlined />,
        className: styles.itemCategoryContainer
    },
    {
        label: 'Bộ Lọc',
        key: '1',
        className: styles.itemContainer
    },
    {
        label: 'Bảng Xếp Hạng',
        key: '2',
        className: styles.itemContainer
    },
];