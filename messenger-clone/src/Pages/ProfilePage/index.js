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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListItemIcon from '@mui/material/ListItemIcon';

import i18n, { languageOption } from '../../utils/i18n';
import { readFile } from '../../utils';
import * as ActionTypes from '../../redux/actionTypes'
import images from '../../assets';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProfilePage() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const updateUserLoading = useSelector((state) => state.user.updateUserLoading)

    const inputRef = React.useRef()

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user)

    const [state, setState] = React.useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatar: { src: user.avatar, file: null },
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
        setState((prevState) => ({ ...prevState, avatar: { src: response.result, file: event.target.files[0] } }))
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
                <img src={state.avatar.src} alt='' className={styles.userAvatar} onClick={onClickUserAvatar} />
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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{i18n.t('auth.language')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label={i18n.t('auth.language')}
                        onChange={handleChange}
                    >
                        {Object.keys(languageOption).map((item) => (
                            <MenuItem value={item}>
                                <div>
                                    <img src={images[item]} style={styles.flagIcon} alt='' />
                                    {i18n.t(`auth.${item}`)}
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{i18n.t('auth.gender')}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className={styles.genderContainer}
                        value={state.gender}
                        onChange={onChange("gender")}
                    >
                        <FormControlLabel value="FEMALE" control={<Radio />} label={i18n.t('auth.female')} disabled={updateUserLoading} />
                        <FormControlLabel value="MALE" control={<Radio />} label={i18n.t('auth.male')} disabled={updateUserLoading} />
                        <FormControlLabel value="OTHER" control={<Radio />} label={i18n.t('auth.other')} disabled={updateUserLoading} />
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