import axios from 'axios';
import React from 'react';

import DetailPage from '../Pages/DetailPage';
import HomePage from '../Pages/HomePage';
import DetailChapterPage from '../Pages/DetailChapterPage';
import AccountPage from '../Pages/AccountPage';
import AccountSettingPage from '../Pages/AccountSettingPage';
import MyStoryManagementPage from '../Pages/MyStoryManagementPage';
import { Story } from './types/story';
import CreateStoryPage from '../Pages/CreateStoryPage';

interface FilterPageParams {
    ranking?: string, // ? = not required
    status?: string,
    genre?: string,
    tags?: string
    category?: string,
}

interface PublicRoute {
    path: string,
    exact: boolean,
    component: React.ComponentType,
    private?: boolean,
}

type FunctionRoute = (...args: any) => PublicRoute

export const publicRoutes = {
    HomePage: () => {
        return {
            path: '/',
            exact: true,
            component: HomePage
        }
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
    ChapterDetail: (storySlug: string, numberOrder: number) => {
        let path = '/truyen/:storySlug/:numberOrder'

        if (storySlug && numberOrder) {
            path = `/truyen/${storySlug}/chuong-${numberOrder}`
        }

        return {
            path,
            exact: true,
            component: DetailChapterPage
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
    AccountPage: () => {
        const path = '/tai-khoan'

        return {
            path,
            exact: true,
            component: AccountPage,
            private: true,
        }
    },
    AccountSettingPage: () => {
        const path = '/dieu-chinh'

        return {
            path,
            exact: true,
            component: AccountSettingPage,
            private: true,
        }
    },
    MyStoryManagementPage: () => {
        const path = '/quan-ly-truyen'

        return {
            path,
            exact: true,
            component: MyStoryManagementPage,
            private: true,
        }
    },
    UpdateMyStoryPage: () => {
        const path = '/sua-truyen'

        return {
            path,
            exact: true,
            component: MyStoryManagementPage,
            private: true,
        }
    },
    CreateStoryPage: () => {
        const path = '/dang-truyen'

        return {
            path,
            exact: true,
            component: CreateStoryPage,
            private: true,
        }
    },
    StoryChapterManagementPage: (storyId: Story["_id"]) => {
        let path = '/danh-sach-truyen/:storyId'

        if (storyId) {
            path = `/danh-sach-truyen/${storyId}`
        }

        return {
            path,
            exact: true,
            component: MyStoryManagementPage,
            private: true,
        }
    },
    CreateStoryChapter: (storyId: Story["_id"]) => {
        let path = '/dang-chuong/:storyId'

        if (storyId) {
            path = `/dang-chuong/${storyId}`
        }

        return {
            path,
            exact: true,
            component: MyStoryManagementPage,
            private: true,
        }
    },
    MyFollowPage: () => {
        const path = '/my-follow'

        return {
            path,
            exact: true,
            component: AccountPage
        }
    },
    MyLikedStoryPage: () => {
        const path = '/my-liked-story'

        return {
            path,
            exact: true,
            component: AccountPage
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
}

export const privateRoutes = {}

export const authRoutes = {}

export const host = 'http://127.0.0.1:3001';

export const axiosClient = axios.create({
    baseURL: `${host}`
});

export enum LocalStorageKey {
    TOKEN = "TOKEN",
    READING_PROGRESS = "READING_PROGRESS",
}

export const pageLimit = 10




