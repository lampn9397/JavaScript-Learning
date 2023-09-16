import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import Header from '../../components/Header';

interface Props extends ReduxProps { }

export default function CategoryPage({
}: Props) {

    return (
        <>
            <Header />
            <div className={`${styles.CategoryPageContainer} flex resolution`}>
            </div>
        </>
    )

}