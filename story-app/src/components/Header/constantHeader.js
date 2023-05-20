import { UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './style.module.css'
import { Button } from 'antd';

export const items = [
    {
        key: '1',
        label: (
            <Link to="https://www.antgroup.com" >
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
