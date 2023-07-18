import React from 'react';
import { UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './style.module.css'

export const getHeaderItem = (publicRoutes: any) => [
    {
        key: '1',
        label: (
            <Link to={publicRoutes.AccountPage().path}>
                <UserOutlined className={styles.marginIcon} />
                Trang Cá Nhân
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="https://www.aliyun.com" >
                <LockOutlined className={styles.marginIcon} />
                Đổi Mật Khẩu
            </Link>
        ),
    },
    {
        key: 'logOut',
        label: (
            <div>
                <LogoutOutlined className={styles.marginIcon} />
                Đăng xuất
            </div>
        ),
    },
];
