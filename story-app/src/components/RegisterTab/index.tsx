import images from '../../assets';
import { Button, Input } from 'antd';
import React from 'react';

import styles from './style.module.scss'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export interface RegisterTabProps {
    onRegister: (username: string, password: string, email: string) => void
}

interface State {
    username: string,
    password: string,
    email: string,
}

export default function RegisterTab({ onRegister }: RegisterTabProps) {

    const [state, setState] = React.useState<State>({
        username: "",
        password: "",
        email: "",
    },)

    const onChange = React.useCallback((fieldName: keyof State): React.ChangeEventHandler<HTMLInputElement> => {
        return function (event) {
            setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
        }
    }, [])

    const onClickRegister = React.useCallback(() => {
        onRegister(state.username, state.password, state.email)
    }, [onRegister, state.email, state.password, state.username])

    return (
        <div className={`${styles.registerTabContainer} column center`}>
            <div className='white-user-container center'>
                <img alt='' src={images.whiteUser} className='white-user' />
            </div>
            <div className='register-Label'>Đăng Kí</div>
            <Input
                prefix={
                    <img alt="" src={images.blackUser}
                        className='default-icon' />
                }
                placeholder="Tên Đăng Nhập"
                maxLength={50}
                className='auth-input'
                onChange={onChange("username")}
            />
            <Input.Password
                prefix={
                    <img alt="" src={images.padLock}
                        className='default-icon' />
                }
                placeholder="Mật Khẩu"
                maxLength={50}
                className='auth-input'
                onChange={onChange("password")}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Input
                prefix={
                    <img alt="" src={images.email}
                        className='default-icon' />
                }
                placeholder="Email"
                maxLength={50}
                className='auth-input'
                onChange={onChange("email")}
            />
            <Button className='register-butt center' onClick={onClickRegister}>Đăng Kí</Button>
        </div>
    )
}