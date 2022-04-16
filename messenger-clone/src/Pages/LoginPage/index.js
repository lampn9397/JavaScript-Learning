import React from 'react';
import styles from '../LoginPage/style.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import images from '../../assets';
import i18n from '../../utils/i18n';
import * as ActionTypes from '../../redux/actionTypes'

function LoginPage() {

    const [username, setUsername] = React.useState("")

    const [password, setPassword] = React.useState("")

    const dispatch = useDispatch();

    function onChangeUsername(event) {
        setUsername(event.target.value)
    }

    function onChangePassword(event) {
        setPassword(event.target.value)
    }

    const onClickLogin = React.useCallback(function () {
        dispatch({ type: ActionTypes.LOGIN, payload: { username: username, password: password } })
    }, [dispatch, username, password])

    return (
        <div className={styles.loginContainer}>

            <Box
                className={styles.loginForm}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <img src={images.messLogo} alt='' className={styles.messLogo} />
                <TextField id="outlined-basic" label={i18n.t('auth.username')} variant="outlined" value={username} onChange={onChangeUsername} />
                <TextField id="outlined-basic" label={i18n.t('auth.password')} variant="outlined" value={password} onChange={onChangePassword} type="password" />
                <Button variant="contained" onClick={onClickLogin}>{i18n.t('auth.login')}</Button>
                <div className={styles.resetPassword}>
                    <div className={styles.line}></div>
                    <p className={styles.pOr}>{i18n.t('auth.or')}</p>
                    <div className={styles.line}></div>
                </div>
                <Button variant="outlined">{i18n.t('auth.register')}</Button>
            </Box>

            <div className={styles.forgetPassword}>

                <Button >{i18n.t('auth.forgotPassword')} ?</Button>
            </div>

        </div>
    )
}

export default LoginPage;