import axios from 'axios';

import DetailPage from '../Pages/DetailPage';
import HomePage from '../Pages/HomePage';

interface FilterPageParams {
    ranking?: string, // ? = not required
    status?: string,
    genre?: string,
    tags?: string
    category?: string,
}

export const publicRoutes = {
    HomePage: {
        path: '/',
        exact: true,
        component: HomePage
    },
    StoryDetail: (slug: string) => {
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
    ChapterDetail: (storySlug: string, chapterNumber: number) => {
        let path = '/truyen/:storySlug/:chapterSlug'

        if (storySlug && chapterNumber) {
            path = `/truyen/${storySlug}/chuong-${chapterNumber}`
        }

        return {
            path,
            exact: true,
            component: null
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
    UserPage: (id: string) => {
        let path = '/ho-so/:id'

        if (id) {
            path = `/ho-so/${id}`
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
        category,
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

        if (category) {
            searchParams.set('category', category)
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

export const pageLimit = 10




