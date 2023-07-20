import React from 'react';

import styles from './style.module.scss'
import { PlusOutlined } from '@ant-design/icons';
import { readFile } from '../../utils';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'

interface State {
    attachFile: {
        filePreview: string | null,
        fileSend: File | null,
    }
}

export default function ChangeAvatarTab() {

    const [state, setState] = React.useState<State>({
        attachFile: { filePreview: null, fileSend: null },
    })

    const dispatch = useDispatch()

    const inputRef = React.useRef<HTMLInputElement>(null)

    const onClickAttackFileIcon = React.useCallback(() => {
        inputRef.current?.click()
    }, [])

    const onClickUpload = React.useCallback(() => {
        dispatch({ type: ActionTypes.UPDATE_PROFILE, payload: { avatar: state.attachFile } })
    }, [dispatch, state.attachFile])

    const onChangeInputFiles = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(async (event) => {
        if (event.target.files) {
            const selectedFile = event.target.files?.[0]

            if (selectedFile.type.startsWith('image/')) {

                const response = await readFile(selectedFile);

                setState((prevState) => ({
                    ...prevState, attachFile: {
                        filePreview: response.result,
                        fileSend: selectedFile ?? null, // ?? lay ve ben phai khi ben trai chi undefine hoac null
                    }
                }))
            } else {
                message.error("Tệp không hợp lệ", 3)
            }
        }

        if (inputRef.current) {
            inputRef.current.value = ''
        }

    }, [])

    return (
        <div className={`${styles.changeAvatarTabContainer} center column`}>
            <div className='avatar-preview-container center column' onClick={onClickAttackFileIcon}>
                <PlusOutlined className='custom-icon' />
                <div className='text'>Tải Ảnh</div>
                <input type="file" ref={inputRef} accept="image/*" hidden onChange={onChangeInputFiles} />
                {state.attachFile.filePreview && (
                    <img alt="" src={state.attachFile.filePreview} className='file-preview' />
                )}
            </div>
            <div className='descrip'>Kiểu tệp phải là hình ảnh và dung lượng không vượt quá 5mb</div>
            <Button onClick={onClickUpload}>Cập nhật</Button>
        </div >
    )

}