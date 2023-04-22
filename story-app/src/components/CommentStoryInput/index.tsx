import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

import styles from './style.module.scss'

interface Props {
    className?: string,
}

export default function CommentStoryInput({ className = "" }: Props) {
    return (
        <div className={`${styles.commentStoryInput} column ${className}`}>
            <TextArea
                placeholder="Nhập Bình Luận"
                autoSize={{ minRows: 3, maxRows: 5 }}
                maxLength={100}
            />
            <Button className='custom-but'>Gửi Bình Luận</Button>
        </div >
    )
}