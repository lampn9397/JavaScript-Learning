import axios from 'axios';

import DetailPage from '../Pages/DetailPage/DetailPage';
import HomePage from '../Pages/HomePage';


export const publicRoutes = {
    HomePage: {
        path: '/',
        exact: true,
        component: HomePage
    },
    DetailPage: (slug) => {
        let path = '/truyen/:slug'

        if (slug) {
            path = `/truyen/${slug}`
        }

        return {
            path,
            exact: true,
            component: DetailPage
        }
    },
    AuthorPage: (id) => {
        let path = '/tac-gia/:id'

        if (id) {
            path = `/tac-gia/${id}`
        }

        return {
            path,
            exact: true,
            component: DetailPage
        }
    },
    CategoryPage: (slug) => {
        let path = '/the-loai/:slug'

        if (slug) {
            path = `/the-loai/${slug}`
        }

        return {
            path,
            exact: true,
            component: DetailPage
        }
    },
    FilterPage: ({ ranking, status } = {}) => {
        let path = '/truyen/bo-loc'

        const searchParams = new URLSearchParams()

        if (ranking) {
            searchParams.set('ranking', ranking)
        }

        if (status) {
            searchParams.set('status', status)
        }

        path = `${path}?${searchParams.toString()}`

        return {
            path,
            exact: true,
            component: HomePage
        }
    },
}

export const privateRoutes = {}

export const authRoutes = {}

export const host = 'http://127.0.0.1:3001';

export const axiosClient = axios.create({
    baseURL: `${host}`
});

