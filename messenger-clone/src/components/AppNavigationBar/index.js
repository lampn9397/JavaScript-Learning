import * as React from 'react';
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom";

import { routes } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes'
import i18n from '../../utils/i18n';

export default function AppNavigationBar() {

    const dispatch = useDispatch();

    let history = useHistory();

    const user = useSelector((state) => state.user.user)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickLogout = React.useCallback(() => {
        dispatch({ type: ActionTypes.LOGOUT })
    }, [dispatch])

    const onClickProfile = React.useCallback(() => {
        history.push(routes.ProfilePage.path)
    }, [history])

    return (
        <>
            <div className={styles.navBarContainer}>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={onClickProfile}>
                        <Avatar /> {i18n.t('auth.profile')}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        {i18n.t('auth.settings')}
                    </MenuItem>
                    <MenuItem onClick={onClickLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {i18n.t('auth.logout')}
                    </MenuItem>
                </Menu>
                <div className={styles.myProfile} onClick={handleClick}>
                    <Tooltip title="Account settings">
                        <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            className={styles.iconButton}
                        >
                            <Avatar className={styles.userAvatar} src={user.avatar} />
                        </IconButton>
                    </Tooltip>

                    <div className={styles.myFirstName}>{user.firstName}</div>
                </div>

            </div>
            <div className={styles.navBarSpace}></div>
        </>
    );
}