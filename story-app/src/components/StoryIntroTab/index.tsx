import React from 'react';
import { Link } from 'react-router-dom';

import type { Story } from '@/constants/types/story';
import type { Chapter } from '@/constants/types/chapter';
import styles from './style.module.scss'
import { publicRoutes } from '../../constants/index';
import AuthorCard from '../AuthorCard';

interface Props {
    story: Story,
    chapters: Chapter[],
    storyByAuthor: Story,
}

export default function StoryIntroTab({ story, chapters, storyByAuthor }: Props) {
    return (
        <div className={`${styles.container} flex`}>
            <div className='column-container column'>
                <div className='story-description long-content'>
                    {story?.description}
                </div>
                <div className='other-infor flex'>
                    <div className='infor-type'>Người Đăng</div>
                    <div className='infor-detail flex'>
                        <Link className='infor-border' to={publicRoutes.UserPage(story.uploader._id).path}>{story.uploader.name}</Link>
                    </div>
                </div>
                <div className='other-infor flex'>
                    <div className='infor-type'>Chương Mới Cập Nhật</div>
                    <div className='column infor-detail'>
                        {chapters.map((item) => (
                            <Link className='new-chapter-color' key={item._id}
                                to={publicRoutes.ChapterDetail(story.slug, item.numberOrder).path}
                            >
                                Chương {item.chapterNumber} : {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='other-infor flex'>
                    <div className='infor-type'>Danh Mục Con</div>
                    <div className='infor-detail tag-container flex'>
                        {story.tags.map((item) => (
                            <Link className='infor-border' key={item._id} to={publicRoutes.FilterPage({ tags: item.slug }).path}>{item.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <AuthorCard author={story.author} storyByAuthor={storyByAuthor} />
        </div>
    )
}