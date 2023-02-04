import React from 'react';
import { Button } from 'antd';

import styles from './style.module.css'


function CreateStoryCard() {

    return (
        <div className={styles.CreateStoryCardContainer}>
            <div className={styles.Header}>Bạn muốn đăng truyện lên Web Truyện Chữ ?</div>
            <div className={styles.content1}>Chúng tôi sẵn sàng hỗ trợ bạn bất cứ lúc nào. Hãy nhấn vào lựa chọn bên dưới.</div>
            <Button type="primary" block className={styles.instructCreateStoryButton}>Hướng Dẫn Đăng Truyện</Button>
            <Button type="primary" block className={styles.instructCreateStoryButton}>Đăng Truyện</Button>
            <div className={styles.content2}>(Cần đăng nhập để xem thông tin)</div>
        </div>
    )
}

CreateStoryCard.propTypes = {

}

CreateStoryCard.defaultProps = {
}

export default CreateStoryCard;