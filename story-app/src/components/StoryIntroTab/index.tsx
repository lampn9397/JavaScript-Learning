import React from 'react';
import { Link } from 'react-router-dom';

import type { Story } from '@/constants/types/story';
import type { Chapter } from '@/constants/types/chapter';
import styles from './style.module.scss'
import { publicRoutes } from '../../constants/index';

interface Props {
    story: Story,
    chapters: Chapter[],
}

export default function StoryIntroTab({ story, chapters }: Props) {
    return (
        <div className={`${styles.container} flex`}>
            <div className='column-container column'>
                <div className='story-description long-content'>
                    {story?.description}
                </div>
                <div className='other-infor flex'>
                    <div className='infor-type'>Người Đăng</div>
                    <div className='infor-detail flex'>
                        <div className='infor-border'>{story.uploader.name}</div>
                    </div>
                </div>
                <div className='other-infor flex'>
                    <div className='infor-type'>Chương Mới Cập Nhật</div>
                    <div className='column infor-detail'>
                        {chapters.map((item) => (
                            <Link className='new-chapter-color' key={item._id} to={""}>Chương {item.chapterNumber} : {item.name}</Link>
                        ))}
                    </div>
                </div>
                <div className='other-infor flex'>
                    <div className='infor-type'>Danh Mục Con</div>
                    <div className='infor-detail tag-container flex'>
                        {story.tags.map((item) => (
                            <Link className='infor-border' to={publicRoutes.FilterPage({ tags: item.slug }).path}>{item.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}