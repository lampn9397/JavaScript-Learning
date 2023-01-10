import React from 'react';
import { Menu } from 'antd';

import styles from './style.module.css'
import { items } from './constantNavBar';

function NavBar() {

    return (
        <div className={`${styles.menuContainer}`}>
            <Menu items={items} mode="horizontal" className={`${styles.menu} resolution`} />
        </div>)
}

export default NavBar;