import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AiOutlineSearch } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './style.module.css'
import * as ActionTypes from '../../redux/actionTypes'
import i18n from '../../utils/i18n';
import SearchItem from '../SearchItem';

export default function ProfileContainer(props) {

    const dispatch = useDispatch();

    const users = useSelector((state) => state.user.searchUser)

    const searchUserLoading = useSelector((state) => state.user.searchUserLoading)

    const [state, setState] = React.useState({
        searchProfileKey: "",
    })

    const onChangeSearchProfile = React.useCallback((event) => {
        dispatch({ type: ActionTypes.SEARCH_USER, payload: event.target.value })
        setState((prevState) => ({ ...prevState, searchProfileKey: event.target.value }))
    }, [dispatch])

    const onClickSearchItem = React.useCallback((item) => () => {
        props.onClickSearchUser(item)
    }, [props])


    return (
        <>
            <TextField
                id="outlined-size-small"
                size="small"
                value={state.searchProfileKey}
                onChange={onChangeSearchProfile}
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
            {searchUserLoading ? (
                <Box sx={{ display: 'flex' }} className={styles.conversationsLoading}>
                    <CircularProgress />
                </Box>
            ) : (
                <div className={styles.listUserContainer}>
                    {users.map((item) => (
                        <SearchItem key={item._id}
                            onClick={onClickSearchItem(item)}
                            avatar={item.avatar}
                            badgeVisible={false}
                            title={`${item.firstName} ${item.lastName}`}
                            lastMessageAtVisible={false}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
