import React from 'react';

import styles from './style.module.scss'
import Header from '../Header';
import { Link, useLocation } from 'react-router-dom';
import { publicRoutes } from '../../constants';
import { UserOutlined } from '@ant-design/icons';
import images from '../../assets';
import classNames from 'classnames';

interface Props {
    children?: React.ReactNode
}

export default function ProfileLayout({ children }: Props) {

    const location = useLocation()

    const items = React.useMemo(() => [{
        icon: <UserOutlined style={{ fontSize: "24px" }} />,
        link: publicRoutes.AccountPage().path,
        text: "Cá nhân",
    },
    {
        icon: <img className='icon' alt='' src={images.book} />,
        link: "google.com",
        text: "Truyện của tôi",
    },
    {
        icon: <img className='icon' alt='' src={images.storyUpload} />,
        link: "google.com",
        text: "Đăng truyện",
    },
    {
        icon: <img className='icon' alt='' src={images.chapterUpload} />,
        link: "google.com",
        text: "Đăng chương",
    },
    {
        icon: <img className='icon' alt='' src={images.author} />,
        link: "google.com",
        text: "Tác giả",
    },
    ], [])

    return (
        <div className={`${styles.profileLayoutContainer} column resolution`}>
            <Header />
            <div className='body-container flex'>
                <div className='menu-list column'>
                    {items.map((item) => {
                        const isSelected = location.pathname === item.link

                        return (
                            <Link
                                className={classNames({
                                    "menu-item-container": true,
                                    "isSelected": isSelected,
                                })}
                                to={item.link}
                                key={item.text}
                            >
                                {item.icon}
                                {item.text}
                            </Link>
                        )
                    })}
                </div>

                {children}
            </div>
        </div >
    )

}