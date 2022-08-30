import * as React from 'react';
import { io } from "socket.io-client";
import axios from 'axios';

import HomePage from "../Pages/HomePage";
import MenuPage from "../Pages/MenuPage";
import LoginPage from "../Pages/LoginPage";
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
    HOME: (id) => {
        let path = '/:id?'

        if (id !== undefined) {
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

export const host = 'http://127.0.0.1:3001';
// export const host = 'https://240e-42-113-33-159.ngrok.io';

export const axiosClient = axios.create({
    baseURL: `${host}/api`
});

export const localStorageKey = {
    token: "token",
    language: "",
}

export const FileTypes = {
    CHAT_IMAGE: 'CHAT_IMAGE',
    CHAT_VIDEO: 'CHAT_VIDEO',
    CHAT_FILE: 'CHAT_FILE',
    USER_AVATAR: 'USER_AVATAR',
};

export const messageTypes = {
    MESSAGE: 'MESSAGE',
    LIKE: 'LIKE',
};

export const newChat = 'newChat'

export const reactApp = 'React App'

export const SocketEvents = {
    NEW_MESSAGE: 'new-message',
    NEW_CONVERSATION: 'new-conversation',
    READ_MESSAGE: 'read-message',
};

export const fullScreenImageRef = React.createRef()

export const appSnackBarRef = React.createRef()

export const socket = io(host, {
    autoConnect: false
});

