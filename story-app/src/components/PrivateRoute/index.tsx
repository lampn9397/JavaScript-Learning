import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';// react-router v4/v5

import { publicRoutes } from '../../constants';

const HomePageRedirect = () => {
    return <Redirect to={publicRoutes.HomePage().path} />
}

export default function PrivateRoute({ component: Component, ...props }: RouteProps) {

    const user = useSelector((state: RootState) => state.auth.user)

    const checkLoginLoading = useSelector((state: RootState) => state.auth.checkLoginLoading)

    return (
        <Route {...props} component={user || checkLoginLoading ? Component : HomePageRedirect} />
    )

}