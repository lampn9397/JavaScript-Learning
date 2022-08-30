import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import * as ActionTypes from '../../redux/actionTypes'
import i18n from '../../utils/i18n';

function AppSnackBar({
}, ref) {

    const [state, setState] = React.useState({
        snackBarOpen: false,
        message: '',
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState((prevState) => ({ ...prevState, snackBarOpen: false }))
    };

    React.useImperativeHandle(ref, () => ({
        open: (message) => {
            setState((prevState) => ({
                ...prevState,
                snackBarOpen: true,
                message
            }))
        }
    }), []);

    return (
        <Snackbar open={state.snackBarOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert variant="filled" severity="error">
                {state.message}
            </Alert>
        </Snackbar>
    );
}

AppSnackBar = React.forwardRef(AppSnackBar)

AppSnackBar.propTypes = {

}

AppSnackBar.defaultProps = {
}

export default AppSnackBar