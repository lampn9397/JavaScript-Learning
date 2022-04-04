import React from 'react';
import styles from './style.module.css'

import { NavBarData } from '../../constants';
import { Link } from 'react-router-dom';

function AppNavigationBar(props) {
    return (
        <>
            <div className={styles.AppNavigationBarContainer}>
                {NavBarData.map((item, index) => (
                    <Link to={item.path} key={index} className={styles.navBarItemList}>
                        <div className={styles.dropDown}>
                            <div className={styles.navBarItem}>
                                {item.navBarImage ? <img src={item.navBarImage} alt='' /> : item.navBarItem}
                                <div className={styles.dropDownContent}>
                                    {item.navBarItemList?.map((subItem, subIndex) => (
                                        <a href={subItem.dropDownContentLink} className={styles.dropDownContentLink} key={subIndex}>
                                            {subItem.dropDownContent}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.navBarSpace}></div>
        </>
    )
}

export default AppNavigationBar;