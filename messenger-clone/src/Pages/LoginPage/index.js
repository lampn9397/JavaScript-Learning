import React from 'react';
import styles from '../LoginPage/style.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import images from '../../assets';
import i18n from '../../utils/i18n';
import * as ActionTypes from '../../redux/actionTypes'
import { publicRoutes } from '../../constants';

function LoginPage() {

    let history = useHistory();

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        username: "",
        password: "",
        usernameError: false,
        passwordError: false,
    })

    function onChange(fieldName) {

        return function (event) {
            setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
        }
    }

    const onClickLogin = React.useCallback(function () {

        const usernameError = state.username.length === 0;

        const passwordError = state.password.length === 0;

        if (!usernameError && !passwordError) {
            dispatch({ type: ActionTypes.LOGIN, payload: { username: state.username, password: state.password } })
        }
        setState((prevState) => ({
            ...prevState,
            usernameError,
            passwordError
        }))
    }, [dispatch, state.username, state.password])

    const onKeyDownLogin = React.useCallback((event) => {
        if (event.key === "Enter") {
            onClickLogin()
        }
    }, [onClickLogin])

    const onClickRegister = React.useCallback(function () {
        history.push(publicRoutes.RegisterPage.path)
    }, [history])

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
                <TextField
                    error={state.usernameError}
                    helperText={state.usernameError ? i18n.t('auth.usernameError') : ""}
                    id="outlined-basic"
                    label={i18n.t('auth.username')}
                    variant="outlined"
                    value={state.username}
                    onChange={onChange("username")}
                    onKeyDown={onKeyDownLogin}
                />
                <TextField
                    error={state.passwordError}
                    helperText={state.passwordError ? i18n.t('auth.passwordError') : ""}
                    id="outlined-basic"
                    label={i18n.t('auth.password')}
                    variant="outlined"
                    value={state.password}
                    onChange={onChange("password")}
                    type="password"
                    onKeyDown={onKeyDownLogin}
                />
                <Button variant="contained" onClick={onClickLogin}>{i18n.t('auth.login')}</Button>
                <div className={styles.resetPassword}>
                    <div className={styles.line}></div>
                    <p className={styles.pOr}>{i18n.t('auth.or')}</p>
                    <div className={styles.line}></div>
                </div>
                <Button variant="outlined" onClick={onClickRegister}>{i18n.t('auth.register')}</Button>
            </Box>

            <div className={styles.forgetPassword}>

                <Button >{i18n.t('auth.forgotPassword')} ?</Button>
            </div>

        </div>
    )
}

export default LoginPage;