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
import CreateStoryChapterPage from '../Pages/CreateStoryChapterPage';
import StoryChapterManagementPage from '../Pages/StoryChapterManagementPage';
import { Chapter } from './types/chapter';
import UpdateMyStoryPage from '../Pages/UpdateMyStoryPage';
import UpdateStoryChapterPage from '../Pages/UpdateStoryChapterPage';
import MyStoryAuthorPage from '../Pages/MyStoryAuthorPage';
import MyStoryPage from '../Pages/MyStoryPage';
import AuthorPage from '../Pages/AuthorPage';
import CategoryPage from '../Pages/CategoryPage';

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
            component: AuthorPage
        }
    },
    UpdateAuthorPage: (id: string) => {
        let path = '/sua-thong-tin-tac-gia/:id'

        if (id) {
            path = `/sua-thong-tin-tac-gia/${id}`
        }

        return {
            path,
            exact: true,
            component: AuthorPage
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
    AccountSettingPage: (tabKey?: string) => {
        let path = '/dieu-chinh'

        if (tabKey) {
            path = `${path}?tabKey=${tabKey}`
        }

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
    MyStoryAuthorPage: () => {
        const path = '/danh-sach-tac-gia-cua-toi'

        return {
            path,
            exact: true,
            component: MyStoryAuthorPage,
            private: true,
        }
    },
    UpdateMyStoryPage: (storyId: Story["_id"]) => {
        let path = '/sua-truyen/:storyId'

        if (storyId) {
            path = `/sua-truyen/${storyId}`
        }

        return {
            path,
            exact: true,
            component: UpdateMyStoryPage,
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
            component: StoryChapterManagementPage,
            private: true,
        }
    },
    CreateStoryChapter: (storyId?: Story["_id"]) => {
        let path = '/dang-chuong/:storyId'

        if (typeof storyId === 'string') {
            path = `/dang-chuong/${storyId}`
        }

        return {
            path,
            exact: true,
            component: CreateStoryChapterPage,
            private: true,
        }
    },
    UpdateStoryChapter: (storyId?: Story["_id"], numberOrder?: Chapter["numberOrder"]) => {
        let path = '/truyen/:storyId/sua-chuong/:numberOrder'

        if (storyId && numberOrder) {
            path = `/truyen/${storyId}/sua-chuong/${numberOrder}`
        }

        return {
            path,
            exact: true,
            component: UpdateStoryChapterPage,
            private: true,
        }
    },
    MyStoryPage: (type?: 'yeu-thich' | 'theo-doi') => {
        let path = `/truyen-cua-toi`

        if (type) {
            path = `${path}?type=${type}`
        }

        return {
            path,
            exact: true,
            component: MyStoryPage,
            private: true,
        }
    },
    MyLikedStoryPage: () => {
        const path = '/truyen-yeu-thich'

        return {
            path,
            exact: true,
            component: AccountPage,
            private: true,
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
            component: CategoryPage
        }
    },
    FilterPage: (filter: FilterPageParams = {}) => {
        let path = '/truyen/bo-loc'

        const searchParams = new URLSearchParams()

        Object.keys(filter).forEach((key) => {
            const filterKey = key as keyof typeof filter

            if (filter[filterKey]) {
                searchParams.set(key, filter[filterKey] as string)
            }
        })

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

export enum StoryStatusLabel {
    ON_GOING = 'Đang ra',
    COMPLETED = 'Đã hoàn thành',
    DROP = 'Đã hủy',
}

export const pageLimit = 10




