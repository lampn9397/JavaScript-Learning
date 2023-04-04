import React from 'react';
import { Link } from 'react-router-dom';

import type { Story } from '@/constants/types/story';
import styles from './style.module.scss'
import { publicRoutes } from '../../constants/index';
import { Comment } from '@/constants/types/comment';

interface Props {
    story: Story,
    commentList: Comment[],
}

export default function StoryComment({ story, commentList }: Props) {
    console.log(commentList)
    return (
        <div className={`${styles.container} flex`}>
            {commentList[0]?.content}
        </div>
    )
}