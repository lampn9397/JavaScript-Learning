import React from 'react';
import { useHistory } from "react-router-dom";

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import NewsBar from '../../components/NewsBar';

import styles from './style.module.css'
import { publicRoutes } from '../../constants';

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
                <NewsBar categories={categories} />
            </div>
        </div>
    )
}

export default HomePage;