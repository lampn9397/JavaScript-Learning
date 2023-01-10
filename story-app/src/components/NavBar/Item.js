import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css'


function Item({
    itemName,
    className,
}) {

    return (
        <span className={`${styles.itemContainer} ${className}`}>{itemName}</span>
    )
}

Item.propTypes = {
    itemName: PropTypes.string.isRequired,
    className: PropTypes.string,
}

Item.defaultProps = {
    className: '',
}

export default Item;