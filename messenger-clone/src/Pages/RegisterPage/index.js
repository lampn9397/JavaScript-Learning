import React from 'react';
import styles from '../RegisterPage/style.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import images from '../../assets';
import i18n from '../../utils/i18n';
import * as ActionTypes from '../../redux/actionTypes'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegisterPage() {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        phone: "",
        email: "",
        gender: "FEMALE",
        phoneError: false,
        snackBar: false
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

    const onClickRegister = React.useCallback(() => {

        const phoneError = state.phone.length !== 10;

        if (!phoneError) {
            dispatch({
                type: ActionTypes.REGISTER_ACCOUNT,
                payload: state,
                callback: () => { setState((prevState) => ({ ...prevState, snackBar: true })) }
            })
        }
        setState((prevState) => ({ ...prevState, phoneError }))
    }, [dispatch, state])

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
                <img src={images.messLogo} alt='' className={styles.messLogo} />
                <div className={styles.nameContainer}>
                    <TextField fullWidth className={styles.firstNameButton} label={i18n.t('auth.firstName')} variant="outlined" value={state.firstName} onChange={onChange("firstName")} />
                    <TextField fullWidth label={i18n.t('auth.lastName')} variant="outlined" value={state.lastName} onChange={onChange("lastName")} />
                </div>
                <TextField fullWidth label={i18n.t('auth.username')} variant="outlined" value={state.username} onChange={onChange("username")} />
                <TextField fullWidth label={i18n.t('auth.password')} variant="outlined" value={state.password} onChange={onChange("password")} />
                <TextField
                    fullWidth
                    label={i18n.t('auth.phone')}
                    error={state.phoneError}
                    helperText={state.phoneError ? i18n.t('auth.phoneError') : ""}
                    variant="outlined"
                    value={state.phone}
                    onChange={onChange("phone")}
                />
                <TextField fullWidth label={i18n.t('auth.email')} variant="outlined" value={state.email} onChange={onChange("email")} />
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
                        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                        <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button variant="outlined" onClick={onClickRegister}>{i18n.t('auth.register')}</Button>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={state.snackBar} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {i18n.t('auth.registerSuccess')}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>

        </div>
    )
}

export default RegisterPage;