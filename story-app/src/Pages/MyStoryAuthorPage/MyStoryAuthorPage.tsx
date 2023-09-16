import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import ProfileLayout from '../../components/ProfileLayout';
import { Author } from '@/constants/types/author';
import { Button } from 'antd';
import { publicRoutes } from '../../constants';
import { Link } from 'react-router-dom';

interface Props extends ReduxProps { }

export default function MyStoryAuthorPage({
    getMyStoryAuthors,
    myStoryAuthorList,
}: Props) {
    React.useEffect(() => {
        getMyStoryAuthors(1, 9999)
    }, [getMyStoryAuthors])

    return (
        <ProfileLayout>
            <div className={`${styles.myStoryAuthorPageContainer} column`}>
                <div className='header-container'>
                    <div className='title'>Danh sách tác giả</div>
                </div>
                <div className='body-container column'>
                    {myStoryAuthorList.map((item: Author) => (
                        <div className='item-container flex' key={item._id}>
                            <img alt='' src={item.avatar} className='poster' />
                            <div className='infor column'>
                                <div className='name long-content'>{item.name}</div>
                                <div className='description long-content'>{item.description}</div>
                            </div>
                            <div className='action-container flex'>
                                <Link to={publicRoutes.AuthorPage(item._id).path}>
                                    <Button className='detail-button'>Chi tiết</Button>
                                </Link>
                                <Link to={publicRoutes.UpdateAuthorPage(item._id).path}>
                                    <Button className='edit-infor-button'>Sửa thông tin</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProfileLayout>
    )

}