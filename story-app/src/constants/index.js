import axios from 'axios';

import DetailPage from '../Pages/DetailPage/DetailPage';
import HomePage from '../Pages/HomePage';


export const publicRoutes = {
    HomePage: {
        path: '/',
        exact: true,
        component: HomePage
    },
    DetailPage: {
        path: '/story/:id',
        exact: true,
        component: DetailPage
    }
}

export const privateRoutes = {}

export const authRoutes = {}

export const host = 'http://127.0.0.1:3001';

export const axiosClient = axios.create({
    baseURL: `${host}`
});
