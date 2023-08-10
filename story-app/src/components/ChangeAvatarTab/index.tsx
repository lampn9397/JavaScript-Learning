import React from 'react';

import styles from './style.module.scss'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'
import ImageFilePreview, { ImageFile } from '../ImageFilePreview';

interface State {
    attachFile: ImageFile
}

export default function ChangeAvatarTab() {

    const [state, setState] = React.useState<State>({
        attachFile: { filePreview: null, fileSend: null },
    })

    const dispatch = useDispatch()

    const onChangeImage = React.useCallback((image: ImageFile) => {
        setState((prevState) => ({ ...prevState, attachFile: image }))
    }, [])

    const onClickUpload = React.useCallback(() => {
        dispatch({ type: ActionTypes.UPDATE_PROFILE, payload: { avatar: state.attachFile } })
    }, [dispatch, state.attachFile])

    return (
        <div className={`${styles.changeAvatarTabContainer} center column`}>
            <ImageFilePreview onChange={onChangeImage} />
            <div className='descrip'>Kiểu tệp phải là hình ảnh và dung lượng không vượt quá 5mboI</div>
            <Button onClick={onClickUpload}>Cập nhật</Button>
        </div >
    )

}