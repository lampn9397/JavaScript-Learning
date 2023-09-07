import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import ProfileLayout from '../../components/ProfileLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Author } from '@/constants/types/author';
import { Button } from 'antd';

interface Props extends ReduxProps { }

interface State {
}

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
                                <Button className='detail-button'>Chi tiết</Button>
                                <Button className='edit-infor-button'>Sửa thông tin</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProfileLayout>
    )

}