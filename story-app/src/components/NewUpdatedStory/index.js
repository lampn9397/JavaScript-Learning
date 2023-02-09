import React from 'react';
import PropTypes from 'prop-types';
import 'moment/locale/vi';
import moment from 'moment';
import {
    ArrowRightOutlined,
} from '@ant-design/icons';

import styles from './style.module.css'
import { Link } from 'react-router-dom';


function NewUpdatedStory({ stories }) {

    return (
        <div className={styles.NewUpdatedStoryContainer}>
            <div className={styles.title}>Truyện Mới Cập Nhật</div>
            {stories.map((item) => (
                <div key={item._id} className={styles.NewUpdateStoryContainer}>
                    <Link className={`${styles.NewUpdatedStoryItemContainer} flex`} to={`/truyen/${item.slug}`}>
                        <div className={styles.NewUpdatedStoryItem}>{item.name}</div>
                        <div className={styles.NewUpdatedStoryAt}>{moment(item.storyUpdateAt).format("HH:mm DD/MM")}</div>
                    </Link>
                    <Link to={`/tac-gia/${item.author?._id}`}>
                        <div className={styles.NewUpdatedStoryItemAuthor}>{item.author?.name}</div>
                    </Link>
                </div>
            ))}
            <Link className='flex' to={`/truyen/truyen-moi-cap-nhat`}>
                <div className={styles.more}>Xem Thêm </div>
                <ArrowRightOutlined className={styles.righArrow} />
            </Link>
        </div>
    )
}

NewUpdatedStory.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
}

NewUpdatedStory.defaultProps = {
}

export default NewUpdatedStory;