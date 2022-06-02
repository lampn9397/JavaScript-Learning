import HomePage from "../Pages/HomePage";
import MenuPage from "../Pages/MenuPage";
import LoginPage from "../Pages/LoginPage";
import axios from 'axios';
import RegisterPage from "../Pages/RegisterPage";
import ProfilePage from "../Pages/ProfilePage";

export const routes = {
    MenuPage: {
        path: '/Menu',
        exact: true,
        component: MenuPage
    },
    ProfilePage: {
        path: '/ProfilePage',
        exact: true,
        component: ProfilePage
    },
    HOME: (id = '') => {
        let path = '/:id?'

        if (id) {
            path = `/${id}`
        }
        return {
            path,
            component: HomePage
        }
    },
}

export const publicRoutes = {
    LoginPage: {
        path: '/',
        exact: true,
        component: LoginPage
    },
    RegisterPage: {
        path: '/Register',
        exact: true,
        component: RegisterPage
    },
}

export const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/api'
});

export const localStorageKey = {
    token: "token"
}

export const FileTypes = {
    CHAT_IMAGE: 'CHAT_IMAGE',
    CHAT_VIDEO: 'CHAT_VIDEO',
    CHAT_FILE: 'CHAT_FILE',
    USER_AVATAR: 'USER_AVATAR',
};