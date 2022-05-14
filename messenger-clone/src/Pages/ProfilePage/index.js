import React from 'react';
import styles from '../ProfilePage/style.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import i18n from '../../utils/i18n';
import { readFile } from '../../utils';
import * as ActionTypes from '../../redux/actionTypes'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProfilePage() {

    const updateUserLoading = useSelector((state) => state.user.updateUserLoading)

    const inputRef = React.useRef()

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user)

    const [state, setState] = React.useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatar: user.avatar,
        email: user.email,
        gender: user.gender,
        phoneError: false,
        snackBar: false,

    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState((prevState) => ({ ...prevState, snackBar: false }))
    };

    const onChange = (fieldName) => (event) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }

    const onClickUpdateProfile = React.useCallback(() => {

        const phoneError = state.phone.length !== 10;

        if (!phoneError) {
            dispatch({
                type: ActionTypes.UPDATE_USERINFO,
                payload: state,
                callback: () => { setState((prevState) => ({ ...prevState, snackBar: true })) }
            })
        }
        setState((prevState) => ({ ...prevState, phoneError }))
    }, [dispatch, state])

    const onClickUserAvatar = React.useCallback(() => {
        inputRef.current.click()
    }, [])

    const onChangeUserAvatar = React.useCallback(async (event) => {
        const response = await readFile(event.target.files[0]);
        setState((prevState) => ({ ...prevState, avatar: response.result }))
    }, [])

    return (
        <div className={styles.RegisterContainer}>
            <Box
                className={styles.RegisterForm}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <img src={state.avatar} alt='' className={styles.userAvatar} onClick={onClickUserAvatar} />
                <input type="file" ref={inputRef} accept="image/*" hidden onChange={onChangeUserAvatar} />
                <div className={styles.nameContainer}>
                    <TextField fullWidth className={styles.firstNameButton} label={i18n.t('auth.firstName')} variant="outlined" value={state.firstName} onChange={onChange("firstName")} disabled={updateUserLoading} />
                    <TextField fullWidth label={i18n.t('auth.lastName')} variant="outlined" value={state.lastName} onChange={onChange("lastName")} disabled={updateUserLoading} />
                </div>
                <TextField
                    fullWidth
                    label={i18n.t('auth.phone')}
                    error={state.phoneError}
                    helperText={state.phoneError ? i18n.t('auth.phoneError') : ""}
                    variant="outlined"
                    value={state.phone}
                    onChange={onChange("phone")}
                    disabled={updateUserLoading}
                />
                <TextField fullWidth label={i18n.t('auth.email')} variant="outlined" value={state.email} onChange={onChange("email")} disabled={updateUserLoading} />
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className={styles.genderContainer}
                        value={state.gender}
                        onChange={onChange("gender")}
                    >
                        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" disabled={updateUserLoading} />
                        <FormControlLabel value="MALE" control={<Radio />} label="Male" disabled={updateUserLoading} />
                        <FormControlLabel value="OTHER" control={<Radio />} label="Other" disabled={updateUserLoading} />
                    </RadioGroup>
                </FormControl>
                <Button variant="outlined" onClick={onClickUpdateProfile} disabled={updateUserLoading}>
                    {updateUserLoading && <CircularProgress size={20} sx={{ marginRight: 1 }} color="inherit" />}
                    {i18n.t('auth.updateProfile')}
                </Button>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={state.snackBar} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {i18n.t('auth.updateProfileSuccess')}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>

        </div>
    )
}

export default ProfilePage;