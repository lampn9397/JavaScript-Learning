import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import styles from './style.module.css'
import i18n, { languageOption } from '../../utils/i18n';
import images from '../../assets';
import { localStorageKey } from '../../constants';

export default function Header() {

    const [state, setState] = React.useState({
        language: localStorage.getItem(localStorageKey.language) || 'vi',
    })

    const onChange = (fieldName) => (event) => {

        i18n.changeLanguage(event.target.value)

        localStorage.setItem(localStorageKey.language, event.target.value);

        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }


    return (
        <>
            <div className={styles.headerContainer}>
                <Select
                    value={state.language}
                    onChange={onChange("language")}
                    className={styles.selectLanguage}
                >
                    {Object.keys(languageOption).map((item, index) => (
                        <MenuItem value={item} key={index}>
                            <div className={styles.languageOption}>
                                <img src={images[item]} className={styles.flagIcon} alt='' />
                                {i18n.t(`auth.${item}`)}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className={styles.headerSpace}></div>
        </>
    );
}