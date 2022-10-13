import * as React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import PreviewFile from '../PreviewFile';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiPicker from 'emoji-picker-react';

import { readFile } from '../../utils';
import styles from './style.module.css'
import { messageTypes } from '../../constants';

export default function ChatInput({
    onSubmit: onSubmitProps,
    attachFilesEnable,
    likeEnable,
    disableChatInput,
}) {

    const [state, setState] = React.useState({
        inputMessage: "",
        attachFiles: { filePreview: [], fileSend: [] },
        emojiOpen: false,
    })

    const inputRef = React.useRef()

    const onSubmit = React.useCallback(() => {

        if (state.attachFiles.fileSend.length || state.inputMessage) {
            onSubmitProps(state.attachFiles.fileSend, state.inputMessage)
            setState((prevState) => ({
                ...prevState, inputMessage: "",
                attachFiles: { filePreview: [], fileSend: [] }
            }))
        }
    }, [onSubmitProps, state.attachFiles.fileSend, state.inputMessage])

    const onChangeInputMessage = React.useCallback((event) => {
        setState((prevState) => ({ ...prevState, inputMessage: event.target.value }))
    }, [])

    const onClickThumpUp = React.useCallback(() => {
        onSubmitProps([], '', messageTypes.LIKE)
    }, [onSubmitProps])

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

        const fileSend = [];

        for (const item of event.target.files) {

            const file = new File([item], item.name, { type: item.type });

            fileSend.push(file)
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
                fileSend: prevState.attachFiles.fileSend.concat(fileSend)
            }
        }))

        inputRef.current.value = ''
    }, [])

    const onClickOpenEmoji = React.useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            emojiOpen: !prevState.emojiOpen,
        }))
    }, [])

    const onEmojiClick = React.useCallback((event, data) => {
        setState((prevState) => ({
            ...prevState,
            inputMessage: `${prevState.inputMessage}${data.emoji}`,
        }))
    }, [])

    return (
        <div className={styles.chatUltils}>
            {attachFilesEnable && (
                <>
                    {state.inputMessage ? (
                        <div className={styles.iconContainer}>
                            <AddIcon color='primary' />
                        </div>
                    ) : (
                        <div className={styles.iconContainer}>
                            <AttachFileIcon color='primary' onClick={onClickAttackFileIcon} />
                            <input type="file" ref={inputRef} accept="image/*" hidden onChange={onChangeInputFiles} multiple />
                        </div>
                    )}
                </>
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
                    disabled={disableChatInput}
                    placeholder="Aa"
                    value={state.inputMessage}
                    onChange={onChangeInputMessage}
                    onKeyDown={onKeyDownInputMessage}
                    className={styles.inputMessageContainer}
                />
                <div className={styles.emojiContainer}>
                    <SentimentSatisfiedAltIcon color='primary' onClick={onClickOpenEmoji} />
                    {state.emojiOpen && (
                        <div className={styles.emojiPicker}>
                            <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle='twitter' />
                        </div>
                    )}
                </div>
            </div>
            {(!likeEnable || state.inputMessage || state.attachFiles.filePreview.length) ? (
                <div className={styles.iconContainer}>
                    <SendIcon color='primary' onClick={onSubmit} />
                </div>
            ) : (
                <div className={styles.iconContainer}>
                    <ThumbUpIcon color='primary' onClick={onClickThumpUp} />
                </div>
            )}
        </div>
    );
}

ChatInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    attachFilesEnable: PropTypes.bool,
    likeEnable: PropTypes.bool,
    disableChatInput: PropTypes.bool,
}

ChatInput.defaultProps = {
    attachFilesEnable: true,
    likeEnable: true,
    disableChatInput: false
}