import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import NewsBar from '../../components/NewsBar';
import { publicRoutes } from '../../constants';
import styles from './style.module.css'

function HomePage({
    categories,
    getCategories,
}) {
    let history = useHistory();
    console.log('homepage', categories)
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