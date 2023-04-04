import React from 'react';
import { Link } from 'react-router-dom';

import type { Story } from '@/constants/types/story';
import { Author } from '@/constants/types/author';
import styles from './style.module.scss'
import { publicRoutes } from '../../constants/index';
import { ArrowRightOutlined } from '@ant-design/icons';

interface Props {
    author: Author,
    storyByAuthor: Story,
}

export default function AuthorCard({ author, storyByAuthor }: Props) {
    return (
        <div className={`${styles.authorContainer} column`}>
            <div className='author-header column'>
                <Link to={publicRoutes.AuthorPage(author._id).path} className='avatar-container center column'>
                    <img src={author.avatar} alt='' className='author-avatar' />
                    <div>{author.name}</div>
                </Link>
                <div className='author-descrip long-content'>{author.description}</div>
            </div>
            <div className='author-bottom column'>
                <Link className='title center flex' to={publicRoutes.AuthorPage(author._id).path}>
                    Tác phẩm cùng tác giả
                    <ArrowRightOutlined />
                </Link>
                <Link to={publicRoutes.StoryDetail(storyByAuthor?.slug).path} className='center'>
                    <div className='story-poster-container'>
                        <img alt='' src={storyByAuthor?.poster} className='story-poster zoom' />
                    </div>
                </Link>
                <Link to={publicRoutes.StoryDetail(storyByAuthor?.slug).path} className='story-name center'>
                    {storyByAuthor?.name}
                </Link>
                <div className='story-descrip long-content'>{storyByAuthor?.description}</div>
            </div>
        </div>
    )
}