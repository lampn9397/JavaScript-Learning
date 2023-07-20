import React from 'react';

import styles from './style.module.scss'
import { Button, Input, notification } from 'antd';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function ChangePasswordTab() {

    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        currentPassword: user?.currentPassword,
        newPassword: user?.newPassword,
        confirmNewpassword: user?.confirmNewpassword,
    })

    const onChangeInput = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }, [])

    const onClickUpdateButton = React.useCallback(() => {
        if (state.newPassword === state.confirmNewpassword) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    currentPassword: state.currentPassword,
                    newPassword: state.newPassword
                }
            })
        } else {
            notification.error({ message: "Xác nhận và mật khẩu phải giống nhau" })
        }
    }, [dispatch, state.confirmNewpassword, state.currentPassword, state.newPassword])

    return (
        <div className={`${styles.changePasswordTabContainer} column`}>
            <div className='input-container flex'>
                <div className={styles.label}>Mật khẩu hiện tại</div>
                <Input.Password className='custom-input' value={state.currentPassword} onChange={onChangeInput} name="currentPassword" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            <div className='input-container flex'>
                <div className={styles.label}>Mật khẩu mới</div>
                <Input.Password className='custom-input' value={state.newPassword} onChange={onChangeInput} name="newPassword" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            <div className='input-container flex'>
                <div className={styles.label}>Xác nhận mật khẩu</div>
                <Input.Password className='custom-input' value={state.confirmNewpassword} onChange={onChangeInput} name="confirmNewpassword" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            <div className='butt-container center'>
                <Button onClick={onClickUpdateButton}>Cập nhật</Button>
            </div>
        </div >
    )

}