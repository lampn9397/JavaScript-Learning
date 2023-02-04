import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css'


function NewStoryDetail({ stories }) {

    return (
        <div className={styles.NewStoryDetailContainer}>
            {stories.map((item) => (
                <div key={item._id}>
                </div>
            ))}
        </div>
    )
}

NewStoryDetail.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
}

NewStoryDetail.defaultProps = {
}

export default NewStoryDetail;