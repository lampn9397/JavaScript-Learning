import React from 'react';
import styles from './style.module.css'
import classNames from 'classnames';

function ButtonTabSelect(props) {

    return (
        <div
            className={classNames({
                [styles.ButtonTabSelect]: true,
                [styles.active]: props.isActive
            })}
            onClick={props.onClick}
        >
            {props.title}
        </div>
    )
}

export default ButtonTabSelect;