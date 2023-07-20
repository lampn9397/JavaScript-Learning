import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import styles from './style.module.scss'
import AccountLayout from '../../components/AccountLayout';
import ChangeProfileTab from '../../components/ChangeProfileTab';
import ChangeAvatarTab from '../../components/ChangeAvatarTab';
import ChangePasswordTab from '../../components/ChangePasswordTab';



export default function AccountSettingPage() {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <div className={`${styles.customLabel}`}>Thông tin cá nhân</div>,
            children: <ChangeProfileTab />,
        },
        {
            key: '2',
            label: <div className={`${styles.customLabel}`}>Thay đổi ảnh đại diện</div>,
            children: <ChangeAvatarTab />,
        },
        {
            key: '3',
            label: <div className={`${styles.customLabel}`}>Thay đổi mật khẩu</div>,
            children: <ChangePasswordTab />,
        },
    ];

    return (
        <AccountLayout>
            <div className={`${styles.accountSettingPageContainer} column`}>
                <Tabs defaultActiveKey="1" items={items} />
            </div >
        </AccountLayout >
    )

}