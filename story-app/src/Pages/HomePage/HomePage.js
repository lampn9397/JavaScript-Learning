import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import * as ActionTypes from '../../redux/actionTypes'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import styles from './style.module.css'
import { publicRoutes } from '../../constants';
import CategoryBar from '../../components/CategoryBar';
import AppCarousel from '../../components/AppCarousel';
import CreateStoryCard from '../../components/CreateStoryCard';
import NewUpdatedStory from '../../components/NewUpdatedStory';

function HomePage({
    categories,
    getCategories,
    topFiveStories,
    getStories,
    newStories,
}) {
    const history = useHistory();

    React.useEffect(() => {
        getCategories()
        getStories("topFiveStories", 1, 5, "totalViews")
        getStories("newStories", 1, 10, "storyUpdateAt")
    }, [getCategories, getStories]);

    const onClickButton = () => {
        history.push(publicRoutes.DetailPage.path)
    }

    return (
        <div className={styles.homePageContainer}>
            <Header />
            <NavBar />
            <div className='resolution flex'>
                <CategoryBar categories={categories} />
                <AppCarousel stories={topFiveStories} />
                <CreateStoryCard />
            </div>
            <div className='resolution flex'>
                <NewUpdatedStory stories={newStories} />
            </div>

        </div>
    )
}

HomePage.propTypes = {
    categories: PropTypes.instanceOf(Array).isRequired,
    getCategories: PropTypes.func.isRequired,
}

HomePage.defaultProps = {

}

export default HomePage;