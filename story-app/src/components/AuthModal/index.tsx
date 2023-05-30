import { RootState } from '@/redux/store';
import Modal from 'antd/es/modal/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style.module.scss'
import * as ActionTypes from "../../redux/actionTypes";
import { Tabs } from 'antd';
import LoginTab, { LoginTabProps } from '../LoginTab';
import RegisterTab, { RegisterTabProps } from '../RegisterTab';

interface Props {
    open: boolean,
}

export default function AuthModal({ open }: Props) {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state: RootState) => state.auth.isModalOpen)

    const authLoading = useSelector((state: RootState) => state.auth.authLoading)

    const oncancel = React.useCallback(() => {
        dispatch({ type: ActionTypes.TOGGLE_AUTH_MODAL })
    }, [dispatch])

    const onLogin = React.useCallback<LoginTabProps['onLogin']>((username, password) => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: { username, password },
        })
    }, [dispatch])

    const onRegister = React.useCallback<RegisterTabProps['onRegister']>((username, password, email, name, gender) => {
        dispatch({
            type: ActionTypes.REGISTER,
            payload: { username, password, email, name, gender }
        })
    }, [dispatch])

    const authTab = React.useMemo(() => {
        return [
            {
                key: '1',
                label: <div className={`${styles.customLabel} ${styles.firstLabel}`}>Đăng Nhập</div>,
                children: <LoginTab onLogin={onLogin} />,
            },
            {
                key: '2',
                label: <div className={styles.customLabel}>Đăng Ký</div>,
                children: <RegisterTab onRegister={onRegister} authLoading={authLoading} />
            },
        ]
    }, [authLoading, onLogin, onRegister])

    return (
        <Modal open={isModalOpen} onCancel={oncancel} footer={null} className={`${styles.authModalContainer}`}>
            <div className='tabs-container'>
                <Tabs defaultActiveKey="1" items={authTab} />
            </div>
        </Modal>
    )
}