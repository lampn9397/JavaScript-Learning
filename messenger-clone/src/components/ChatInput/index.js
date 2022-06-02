import * as React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import PreviewFile from '../PreviewFile';
import classNames from 'classnames';

import { readFile } from '../../utils';
import styles from './style.module.css'

export default function ChatInput(props) {

    const [state, setState] = React.useState({
        inputMessage: "",
        attachFiles: { filePreview: [], fileSend: [] }
    })

    const inputRef = React.useRef()

    const onSubmit = React.useCallback(() => {
        if (state.attachFiles.fileSend.length || state.inputMessage) {
            props.onSubmit(state.attachFiles.fileSend, state.inputMessage)
            setState((prevState) => ({
                ...prevState, inputMessage: "",
                attachFiles: { filePreview: [], fileSend: [] }
            }))
        }
    }, [props, state.attachFiles.fileSend, state.inputMessage])

    const onChangeInputMessage = React.useCallback((event) => {
        setState((prevState) => ({ ...prevState, inputMessage: event.target.value }))
    }, [])

    const onKeyDownInputMessage = React.useCallback((event) => {
        if (event.key === "Enter") {
            onSubmit()
        }
    }, [onSubmit])

    const onClickAttackFileIcon = React.useCallback(() => {
        inputRef.current.click()
    }, [])

    const onClickRemove = React.useCallback((item, index) => {
        const attachFiles = { ...state.attachFiles }
        attachFiles.filePreview.splice(index, 1)
        attachFiles.fileSend.splice(index, 1)
        setState((prevState) => ({ ...prevState, attachFiles }))
    }, [state.attachFiles])


    const onChangeInputFiles = React.useCallback(async (event) => {

        const filePreview = []

        for (const item of event.target.files) {
            if (item.type.startsWith('image')) {
                const response = await readFile(item);
                filePreview.push(response.result);
                continue
            }
            filePreview.push(item)
        }
        setState((prevState) => ({
            ...prevState,
            attachFiles: {
                filePreview: prevState.attachFiles.filePreview.concat(filePreview),
                fileSend: prevState.attachFiles.fileSend.concat([...event.target.files])
            }
        }))

    }, [])

    return (
        <div className={styles.chatUltils}>
            {props.inputMessage ? (
                <div className={styles.iconContainer}>
                    <AddIcon color='primary' />
                </div>
            ) : (
                <div className={styles.iconContainer}>
                    <AttachFileIcon color='primary' onClick={onClickAttackFileIcon} />
                    <input type="file" ref={inputRef} accept="image/*" hidden onChange={onChangeInputFiles} multiple />
                </div>
            )}
            <div className={classNames({
                [styles.TextFieldContainer]: true,
                [styles.TextFieldContainerWithFile]: state.attachFiles.filePreview.length
            })} >
                <PreviewFile PreviewFile={state.attachFiles.filePreview} onClickRemove={onClickRemove} />
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '0px',
                        },
                    }}
                    id="outlined-size-small"
                    size="small"
                    placeholder="Aa"
                    value={state.inputMessage}
                    onChange={onChangeInputMessage}
                    onKeyDown={onKeyDownInputMessage}
                    className={styles.inputMessageContainer}
                />
            </div>
            {
                (state.inputMessage || state.attachFiles.filePreview.length) ? (
                    <div className={styles.iconContainer}>
                        <SendIcon color='primary' onClick={onSubmit} />
                    </div>
                ) : (
                    <div className={styles.iconContainer}>
                        <ThumbUpIcon color='primary' onClick={onSubmit} />
                    </div>
                )
            }
        </div>
    );
}