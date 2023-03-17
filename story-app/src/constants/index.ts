import axios from 'axios';

import DetailPage from '../Pages/DetailPage';
import HomePage from '../Pages/HomePage';

interface FilterPageParams {
    ranking?: string, // ? = not required
    status?: string,
    genre?: string,
    tags?: string
}

export const publicRoutes = {
    HomePage: {
        path: '/',
        exact: true,
        component: HomePage
    },
    DetailPage: (slug: string) => {
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
    AuthorPage: (id: string) => {
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
    CategoryPage: (slug: string) => {
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
    FilterPage: ({
        ranking,
        status,
        genre,
        tags,
    }: FilterPageParams = {}) => {
        let path = '/truyen/bo-loc'

        const searchParams = new URLSearchParams()

        if (ranking) {
            searchParams.set('ranking', ranking)
        }

        if (status) {
            searchParams.set('status', status)
        }

        if (genre) {
            searchParams.set('genre', genre)
        }

        if (tags) {
            searchParams.set('tags', tags)
        }

        path = `${path}?${searchParams.toString()}`

        return {
            path,
            exact: true,
            component: HomePage
        }
    },
    ChapterPage: ({ storySlug, chapterSlug } = { storySlug: "", chapterSlug: "" }) => {
        let path = '/truyen/:storySlug/:chapterSlug'

        if (storySlug && chapterSlug) {
            path = `/truyen/${storySlug}/${chapterSlug}`
        }

        return {
            path,
            exact: true,
            component: DetailPage
        }
    }
}

export const privateRoutes = {}

export const authRoutes = {}

export const host = 'http://127.0.0.1:3001';

export const axiosClient = axios.create({
    baseURL: `${host}`
});

