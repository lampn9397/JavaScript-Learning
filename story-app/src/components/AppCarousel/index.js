import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './style.module.css'
import { publicRoutes } from '../../constants';


function AppCarousel({ stories }) {
    const [state, setState] = React.useState({
        currentCarouselIndex: 0,
    })

    const carouselRef = React.useRef()

    const afterChange = React.useCallback((currentIndex) => {
        setState((prevState) => ({ ...prevState, currentCarouselIndex: currentIndex }))
    }, [])

    const onClickCarousel = React.useCallback((index) => () => {
        carouselRef.current.goTo(index)
    }, [])

    return (
        <div className={styles.AppCarouselContainer}>
            <Carousel autoplay className={styles.AppCarousel} pauseOnHover={false} dots={false} afterChange={afterChange} ref={carouselRef}>
                {stories.map((item) => (
                    <Link className={`${styles.carouselItemContainer}`} to={publicRoutes.StoryDetail(item.slug).path} key={item._id}>
                        <img src={item.poster} className={styles.poster} alt='' />
                    </Link>
                ))}
            </Carousel>
            <div className={`${styles.carouselItemNameContainer} flex`}>
                {stories.map((item, index) => (
                    <div className={classNames({
                        [styles.carouselItemName]: true,
                        [styles.carouselItemNameActive]: index === state.currentCarouselIndex,
                        alignCenter: true,
                    })} onClick={onClickCarousel(index)} key={item._id}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}

AppCarousel.propTypes = {
    stories: PropTypes.instanceOf(Array).isRequired,
}

AppCarousel.defaultProps = {
}

export default AppCarousel;