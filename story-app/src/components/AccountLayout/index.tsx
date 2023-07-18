import React, { Children } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import styles from './style.module.scss'
import ProfileLayout from '../ProfileLayout';
import * as ActionTypes from '../../redux/actionTypes'
import { RootState } from '@/redux/store';
import images from '../../assets';
import { publicRoutes } from '../../constants';


interface Props {
    children?: React.ReactNode,
}

export default function AccountLayout({
    children
}: Props) {

    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user)

    const userStoryList = useSelector((state: RootState) => state.story.userStoryList)

    React.useEffect(() => {
        if (user) {
            dispatch({
                type: ActionTypes.GET_USER_STORY_LIST,
                payload: {
                    storyId: user._id,
                }
            })
        }
    }, [dispatch, user])

    return (
        <ProfileLayout>
            <div className={`${styles.accountLayoutContainer} column`}>
                <div className='header-container column'>
                    <img alt='' src={images.voHiep2} className='header-background' />
                    <div className='bottom-container center'>
                        <div>Tổng số truyện đã đăng : {userStoryList?.totalStory}</div>
                        <div className='seperator' />
                        <div>Tổng số chương đã đăng: {userStoryList?.totalChapters}</div>
                    </div>
                    <div className='avatar-container center'>
                        <Link to={publicRoutes.AccountSettingPage().path}>
                            <Avatar size={110} src={user?.avatar} className='avatar' />
                        </Link>
                        <div className='user-info center'>
                            <Link to={publicRoutes.AccountSettingPage().path}>{user?.name} ( ID : {user?._id} )</Link>
                            <Link to={publicRoutes.AccountSettingPage().path}>
                                <img alt='' src={images.edit} className='edit-icon' />
                            </Link>
                        </div>
                    </div>
                </div>
                {children}
            </div >
        </ProfileLayout >
    )

}