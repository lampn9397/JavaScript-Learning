import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import ProfileLayout from '../../components/ProfileLayout';
import { Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Story } from '../../constants/types/story';
import { publicRoutes } from '../../constants';
import moment from 'moment';
import { getStoryStatusLabel } from '../../utils';
import Header from '../../components/Header';

interface Props extends ReduxProps { }

export default function FilterPage({
    categories,
    getCategories,
    getStories,
}: Props) {
    const { id }: any = useParams()

    React.useEffect(() => {
        getCategories()
    }, [getCategories])

    return (
        <>
            <Header />
            <div className={`${styles.filterPageContainer} flex resolution`}>
                <div className='author-container column'>
                    <img alt="" src={""} className='author-avatar' />
                    <div className='author-name long-content'>{""}</div>
                    <div className='author-descrip long-content'>{""}</div>
                </div>
                <div className='story-container column'>
                    <div className='header-container'>
                        <div className='title'>Bộ lọc</div>
                    </div>
                    <div className='category-container flex'>
                        {categories.map((item: Story["category"]) => (
                            <Link className='category' key={item._id} to={publicRoutes.FilterPage({ category: item.slug }).path}>{item.name}</Link>
                        ))}
                    </div>
                    <div className='body-container column'>
                        {[].map((item: Story) => (
                            <div className='item-container flex' key={item._id}>
                                <img alt='' src={item.poster} className='poster' />
                                <div className='infor column'>
                                    <div className='name long-content'>{item.name}</div>
                                    <div className='flex more-infor'>
                                        <div className='more-infor-item'>{item.author.name}</div>
                                        <Link className='more-infor-item hover' to={publicRoutes.CategoryPage(item.category.slug).path}>{item.category.name}</Link>
                                        <div className='more-infor-item'>{getStoryStatusLabel(item.status)}</div>
                                        <div className='more-infor-item no-border'>{item.totalChapter} chương</div>
                                    </div>
                                    <div className='description long-content'>{item.description}</div>
                                    <div className='updated-at'>Cập nhật : {moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                                </div>
                                <div className='action-container flex'>
                                    <Link to={publicRoutes.StoryDetail(item.slug).path}>
                                        <Button className='edit-infor-button'>Chi tiết</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}