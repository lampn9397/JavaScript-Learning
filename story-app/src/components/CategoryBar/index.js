import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

import images from '../../assets';
import styles from './style.module.css'

function CategoryBar({ categories }) {
    const [state, setState] = React.useState({
        isModalOpen: false,
    })

    const onClickMoreItem = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isModalOpen: true }))
    }, [])

    const onCancel = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isModalOpen: false }))
    }, [])

    return (
        <>
            <div className={`${styles.categoryBarContainer}`}>
                <div className={`${styles.categoryBarRow} flex`}>
                    {categories.map((item, index) => {
                        if (index > 13) return null

                        if (index === 13) return (
                            <div className={`${styles.categoryBarItem} alignCenter`} key={index} onClick={onClickMoreItem}>
                                <img alt='' src={images.more} className={styles.categoryBarItemIcon} />
                                <div className={`${styles.categoryBarItemInfo} column`}>
                                    <div className={`${styles.categoryBarItemName}`}>Tất Cả</div>
                                </div>
                            </div>
                        )

                        return (
                            <Link className={`${styles.categoryBarItem} alignCenter`} key={index} to={`/danh-muc/${item.slug}`}>
                                <img alt='' src={images[item.slug]} className={styles.categoryBarItemIcon} />
                                <div className={`${styles.categoryBarItemInfo} column`}>
                                    <div className={`${styles.categoryBarItemName}`}>{item.name}</div>
                                    <div className={`${styles.categoryBarItemCount}`}>{item.storyCount}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <Modal title="Tất Cả Thể Loại" open={state.isModalOpen} footer={null} onCancel={onCancel}>
                <div className={`${styles.allCategoryBarRow} flex`}>
                    {categories.map((item, index) => {
                        return (
                            <Link className={`${styles.categoryBarItem} alignCenter`} key={index} to={`/danh-muc/${item.slug}`}>
                                <img alt='' src={images[item.slug]} className={styles.categoryBarItemIcon} />
                                <div className={`${styles.categoryBarItemInfo} column`}>
                                    <div className={`${styles.categoryBarItemName}`}>{item.name}</div>
                                    <div className={`${styles.categoryBarItemCount}`}>{item.storyCount}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}

CategoryBar.propTypes = {
    categories: PropTypes.instanceOf(Array).isRequired,
}

CategoryBar.defaultProps = {
}

export default CategoryBar;