import React from 'react';
import { Menu } from 'antd';

import styles from './style.module.css'
import { items } from './constantNavBar';
import { useHistory } from 'react-router-dom';
import { publicRoutes } from '../../constants';

function NavBar() {
    let history = useHistory();

    const onClickMenuItem = React.useCallback((item, key) => {
        if (item.key === "Bộ Lọc") {
            history.push(publicRoutes.FilterPage().path)
        }
    }, [history])

    return (
        <div className={`${styles.menuContainer}`}>
            <Menu items={items} mode="horizontal" className={`${styles.menu} resolution`} onClick={onClickMenuItem} />
        </div>
    )
}

export default NavBar;