import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import styles from './style.module.css'
import { publicRoutes } from '../../constants';
import CategoryBar from '../../components/CategoryBar';

function HomePage({
    categories,
    getCategories,
}) {
    const history = useHistory();

    React.useEffect(() => {
        getCategories()
    }, [getCategories]);

    const onClickButton = () => {
        history.push(publicRoutes.DetailPage.path)
    }

    return (
        <div className={styles.homePageContainer}>
            <Header />
            <NavBar />
            <div className='resolution column'>
                <CategoryBar categories={categories} />
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