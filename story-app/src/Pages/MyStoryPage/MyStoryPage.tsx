import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import ProfileLayout from '../../components/ProfileLayout';
import moment from 'moment';
import useQuery from '../../hooks/useQuery';
import { getStoryStatusLabel } from '../../utils';

interface Props extends ReduxProps { }

export default function MyStoryPage({
    myFollowStoryList,
    getMyFollowStoryList,
    getMyLikedStoryList,
    myLikedStoryList,
}: Props) {
    const query = useQuery()

    const isFollow = React.useMemo(() => {
        return query.get("type") === "theo-doi"
    }, [query])

    React.useEffect(() => {
        if (isFollow) {
            getMyFollowStoryList()
        } else {
            getMyLikedStoryList()
        }
    }, [getMyFollowStoryList, getMyLikedStoryList, isFollow])

    return (
        <ProfileLayout>
            <div className={`${styles.myStoryPageContainer} column`}>
                <div className='header-container'>
                    <div className='title'>{isFollow ? "Truyện theo dõi của tôi" : "Truyện yêu thích của tôi"}</div>
                </div>
                <div className='body-container column'>
                    {(isFollow ? myFollowStoryList : myLikedStoryList).map((item: any) => (
                        <div className='item-container flex' key={item._id}>
                            <img alt='' src={item.story.poster} className='poster' />
                            <div className='infor column'>
                                <div className='name long-content'>{item.story.name}</div>
                                <div className='total-views'>Lượt xem : {item.story.totalViews}</div>
                                <div className='status'>Tình trạng : {getStoryStatusLabel(item.story.status)}</div>
                                <div className='total-chapters'>Số chương : {item.story.totalChapter}</div>
                            </div>
                            <div className='action-container flex'>
                                <div className='updated-at'>Mới cập nhật : {moment(item.story.storyUpdateAt).format("HH:mm DD/MM/YYYY")}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProfileLayout>
    )

}