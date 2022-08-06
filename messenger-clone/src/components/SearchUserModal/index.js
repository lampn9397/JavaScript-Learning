import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosClient } from '../../constants'
import ClearIcon from '@mui/icons-material/Clear';
import { debounce } from 'lodash';

import styles from './style.module.css'
import i18n from '../../utils/i18n';
import * as ActionTypes from '../../redux/actionTypes'
import SearchItem from '../SearchItem';
import ChatInput from '../../components/ChatInput';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SearchUserModal({
    open,
    onClose: onCloseProps,
}) {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        searchProfileKey: "",
        searchProfile: [],
        searchUserLoading: false,
        selectedUsers: [],
    })

    const onClose = React.useCallback(() => {
        onCloseProps()
        setState((prevState) => ({
            ...prevState,
            searchProfile: [],
            searchProfileKey: "",
            selectedUsers: [],
        }))
    }, [onCloseProps])

    const onChangeSearchProfile = async (event) => {
        setState((prevState) => ({
            ...prevState,
            searchUserLoading: true,
            searchProfileKey: event.target.value,
        }))
        const { data } = await axiosClient.get(`/user?q=${event.target.value}&includeFriend=${true}`);
        setState((prevState) => ({
            ...prevState,
            searchProfile: data.results,
            searchUserLoading: false,
        }))
    }

    const onClickAddIcon = React.useCallback((item) => () => {
        setState((prevState) => {
            const searchProfile = JSON.parse(JSON.stringify(prevState.searchProfile))

            const index = searchProfile.findIndex((user) => user._id === item._id)

            const selectedUsers = JSON.parse(JSON.stringify(prevState.selectedUsers))

            const indexSelectedUser = selectedUsers.findIndex((indexUser) => indexUser._id === item._id)

            if (indexSelectedUser === -1) selectedUsers.push(item)

            else selectedUsers.splice(indexSelectedUser, 1)

            return ({
                ...prevState,
                searchProfile,
                selectedUsers,
            })
        })
    }, [])

    const checkItemSelected = React.useCallback((item) => (
        state.selectedUsers.some((user) => user._id === item._id)
    ), [state.selectedUsers])

    const sendMessage = React.useCallback((file, inputMessage) => {

        if (state.selectedUsers.length < 2) return

        dispatch({
            type: ActionTypes.CREATE_CONVERSATIONS,
            payload: { text: inputMessage, selectedUsers: state.selectedUsers }
        })

        onClose()
    }, [dispatch, onClose, state.selectedUsers])

    const searchSelectedUser = state.selectedUsers.concat(state.searchProfile.filter((item) => {
        return !state.selectedUsers.some((user) => user._id === item._id)
    }))

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={`${styles.header}`}>
                    <div className={styles.clearIconContainer} onClick={onClose}>
                        <ClearIcon fontSize='12px' />
                    </div>
                </div>
                <TextField
                    id="outlined-size-small"
                    value={state.searchProfileKey}
                    onChange={onChangeSearchProfile}
                    size="small"
                    className={`${styles.customTextField}`}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                        className: styles.searchInput
                    }}
                    placeholder={i18n.t('chat.searchDescription')}
                />
                {state.searchUserLoading ? (
                    <Box sx={{ display: 'flex' }} className={styles.conversationsLoading}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div className={styles.listUserContainer}>
                        {searchSelectedUser.map((item, index) => (
                            <SearchItem key={item._id}
                                avatar={item.avatar}
                                badgeVisible={false}
                                title={`${item.firstName} ${item.lastName}`}
                                lastMessageAtVisible={false}
                                addUserEnable
                                onClickAddIcon={onClickAddIcon(item, index)}
                                checkItemSelected={checkItemSelected(item)}
                            />
                        ))}
                    </div>
                )}
                <ChatInput attachFilesEnable={false} likeEnable={false} onSubmit={sendMessage} disableChatInput={state.selectedUsers.length < 2} />
            </Box>
        </Modal>
    )
}

SearchUserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

SearchUserModal.defaultProps = {

}