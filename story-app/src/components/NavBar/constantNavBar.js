import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

import styles from './style.module.css'

export const items = [
    {
        label: 'Thể Loại',
        key: 'Thể Loại',
        icon: <MenuOutlined />,
        className: styles.itemCategoryContainer
    },
    {
        label: 'Bộ Lọc',
        key: 'Bộ Lọc',
        className: styles.itemContainer
    },
    {
        label: 'Bảng Xếp Hạng',
        key: 'Bảng Xếp Hạng',
        className: styles.itemContainer
    },
];