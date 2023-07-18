import React from 'react';

import styles from './style.module.scss'
import { Button, Input, Radio, RadioChangeEvent } from 'antd';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Gender } from '../../constants/types/user';
import { getGenderLabel } from '../../utils';
import * as ActionTypes from '../../redux/actionTypes'

export default function ChangeProfileTab() {

    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        name: user?.name,
        gender: user?.gender,
    })

    React.useEffect(() => {
        if (user) {
            setState((prevState) => ({
                ...prevState,
                name: user.name,
                gender: user.gender
            }))
        }
    }, [user])

    const onChangeRadioGr = React.useCallback((event: RadioChangeEvent) => {
        setState((prevState) => ({ ...prevState, gender: event.target.value }))
    }, [])

    const onChangeInput = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setState((prevState) => ({ ...prevState, name: event.target.value }))
    }, [])

    const onClickUpdateButton = React.useCallback(() => {
        dispatch({
            type: ActionTypes.UPDATE_PROFILE,
            payload: {
                name: state.name,
                gender: state.gender
            }
        })
    }, [dispatch, state.gender, state.name])

    return (
        <div className={`${styles.changeProfileTabContainer} column`}>
            <div className='name-container flex'>
                <div className={styles.label}>Họ và Tên</div>
                <Input className='custom-input' value={state.name} onChange={onChangeInput} />
            </div>
            <div className='gender-container flex'>
                <div className={styles.label}>Giới tính</div>
                <Radio.Group onChange={onChangeRadioGr} value={state.gender}>
                    {Object.keys(Gender).map((key) => (
                        <Radio value={key} key={key}>{getGenderLabel(key)}</Radio>
                    ))}
                </Radio.Group>
            </div>
            <div className='butt-container center'>
                <Button onClick={onClickUpdateButton}>Cập nhật</Button>
            </div>
        </div >
    )

}