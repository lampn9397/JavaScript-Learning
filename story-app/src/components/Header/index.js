import React from 'react';
import styles from './style.module.css'
import { AutoComplete, Input, Dropdown, theme } from 'antd';
import { Avatar } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';

import images from '../../assets';
import { items } from './constantHeader';
import { Link } from 'react-router-dom';
import { publicRoutes } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from "../../redux/actionTypes";
import AuthModal from '../AuthModal';

const { useToken } = theme;

function Header() {
    const { token } = useToken();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user)

    const contentStyle = React.useMemo(() => ({
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    }), [token.borderRadiusLG, token.boxShadowSecondary, token.colorBgElevated]);

    const onClickAuthModal = React.useCallback(() => {
        dispatch({ type: ActionTypes.TOGGLE_AUTH_MODAL })
    }, [dispatch])

    const dropDownRender = React.useCallback((menu) => {
        return (
            <div style={contentStyle} className={styles.menuContentContainer}>

                <div className={styles.userInforContainer}>
                    <Avatar size={48} icon={<UserOutlined />} />
                    <div className={styles.userInfor}>Ngo Duc Minh Tri</div>
                </div>
                {React.cloneElement(menu, {
                    style: {
                        boxShadow: 'none',
                        width: '100%'
                    },
                })}
            </div>
        )
    }, [contentStyle])

    return (
        <div className={`${styles.HeaderContainer} resolution`}>
            <Link className={styles.logoContainer} to={publicRoutes.HomePage.path}>
                <div className={styles.bookOutLineContainer}>
                    <img src={images.fairytale} className={styles.bookOutLine} alt='' />
                </div>
                <div className={styles.slogan}>
                    WEB TRUYỆN CHỮ
                </div>
            </Link>
            <AutoComplete className={styles.authorStorySearch}>
                <Input.Search size="large" placeholder="Nhập tên truyện hoặc tác giả" />
            </AutoComplete>
            <div className={styles.accountContainer}>
                {user ? (
                    <Dropdown menu={{ items }} placement="bottomRight" arrow={true} dropdownRender={dropDownRender}>
                        <Avatar size={48} icon={<UserOutlined />} />
                    </Dropdown>
                ) : (
                    <div className={`${styles.loginContainer} flex center`} onClick={onClickAuthModal}>
                        <LoginOutlined />
                        <div>Tài khoản</div>
                    </div>
                )}
            </div>
            <AuthModal />
        </div>
    )
}

export default Header;