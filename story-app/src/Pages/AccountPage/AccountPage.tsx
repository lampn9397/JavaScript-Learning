import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import AccountLayout from '../../components/AccountLayout';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { publicRoutes } from '../../constants';
import { Link } from 'react-router-dom';

interface Props extends ReduxProps {
    children?: React.ReactNode,
}

export default function AccountPage({
    getMyLikedStoryList,
    myLikedStoryList,
    getMyFollowStoryList,
    myFollowStoryList,
}: Props) {

    const user = useSelector((state: RootState) => state.auth.user)

    React.useEffect(() => {
        if (user) {
            getMyLikedStoryList()
            getMyFollowStoryList()
        }
    }, [getMyFollowStoryList, getMyLikedStoryList, user])

    const items = React.useMemo(() => [
        {
            label: "Truyện theo dõi",
            quantity: myFollowStoryList.length,
            link: publicRoutes.MyStoryPage('theo-doi').path,
        },
        {
            label: "Truyện đã thích",
            quantity: myLikedStoryList.length,
            link: publicRoutes.MyStoryPage('yeu-thich').path,
        },
    ], [myFollowStoryList.length, myLikedStoryList.length])

    return (
        <AccountLayout>
            <div className={`${styles.accountPageContainer} center`}>
                {items.map((item) => (
                    <div className='item-container column'>
                        <div className='label'>{item.label}</div>
                        <div className='quantity-container center'>
                            <div className='quantity'>{item.quantity}</div>
                        </div>
                        <Link className='link' to={item.link}>Xem tất cả</Link>
                    </div>
                ))}
            </div >
        </AccountLayout >
    )

}