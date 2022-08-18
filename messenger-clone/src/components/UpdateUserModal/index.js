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
import Button from '@mui/material/Button';

import styles from './style.module.css'
import i18n from '../../utils/i18n';
import * as ActionTypes from '../../redux/actionTypes'
import SearchItem from '../SearchItem';

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

export default function UpdateUserModal({
    open,
    onClose: onCloseProps,
    initSelectedUsers,
    conversationId,
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

    const searchSelectedUser = state.selectedUsers.concat(state.searchProfile.filter((item) => {
        return !state.selectedUsers.some((user) => user._id === item._id)
    }))

    const checkDisable = React.useMemo(() => {
        if (state.selectedUsers.length < 2) return true

        if (state.selectedUsers.length !== initSelectedUsers.length) return false

        for (const userItem of state.selectedUsers) {
            const isExistUser = initSelectedUsers.some((user) => user._id === userItem._id)

            if (!isExistUser) return false
        }

        return true
    }, [state.selectedUsers, initSelectedUsers])

    const onClickConfirm = React.useCallback(() => {
        const users = state.selectedUsers.map((userItem) => userItem._id)
        dispatch({
            type: ActionTypes.UPDATE_GROUPCHAT,
            payload: { users }
        })
    }, [dispatch, state.selectedUsers])

    React.useEffect(() => {
        if (open && initSelectedUsers) {
            setState((prevState) => ({
                ...prevState,
                selectedUsers: initSelectedUsers,
            }))
        }
    }, [initSelectedUsers, open])

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
                        {searchSelectedUser.map((item, index) => {

                            const isInitSelectedUser = initSelectedUsers?.some((user) => user._id === item._id)

                            return (
                                <SearchItem key={item._id}
                                    avatar={item.avatar}
                                    badgeVisible={false}
                                    title={`${item.firstName} ${item.lastName}`}
                                    lastMessageAtVisible={false}
                                    addUserEnable={!isInitSelectedUser}
                                    onClickAddIcon={onClickAddIcon(item, index)}
                                    checkItemSelected={checkItemSelected(item)}
                                />
                            )
                        })}
                    </div>
                )}
                <Button variant="contained" fullWidth disabled={checkDisable} onClick={onClickConfirm}>{i18n.t('auth.confirm')}</Button>
            </Box>
        </Modal>
    )
}

UpdateUserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    initSelectedUsers: PropTypes.instanceOf(Array),
    conversationId: PropTypes.string.isRequired,
}

UpdateUserModal.defaultProps = {
    initSelectedUsers: [],
}