import * as ActionTypes from "../actionTypes";

const defaultState = {
    user: null,
    loginLoading: true,
    searchUser: [],
    searchUserLoading: false,
    updateUserLoading: false,

};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_USERINFO:
            return {
                ...state,
                loginLoading: true,
            };
        case ActionTypes.GET_USERINFO_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                user: action.payload,
            };
        case ActionTypes.GET_USERINFO_FAILED:
            return {
                ...state,
                loginLoading: false,
            };
        case ActionTypes.UPDATE_USERINFO:
            return {
                ...state,
                updateUserLoading: true,
            };
        case ActionTypes.UPDATE_USERINFO_SUCCESS:
            return {
                ...state,
                user: action.payload,
                updateUserLoading: false,
            };
        case ActionTypes.UPDATE_USERINFO_FAILED:
            return {
                ...state,
                updateUserLoading: false,
            };
        case ActionTypes.SEARCH_USER: {
            // if (!action.payload) {
            //     return {
            //         ...state,
            //         searchUserLoading: false,
            //         searchUser: [],
            //     }
            // }

            return {
                ...state,
                searchUserLoading: !!action.payload,
                searchUser: action.payload ? state.searchUser : []
            };
        }
        case ActionTypes.SEARCH_USER_SUCCESS:
            return {
                ...state,
                searchUser: action.payload,
                searchUserLoading: false,
            };
        case ActionTypes.SEARCH_USER_FAILED:
            return {
                ...state,
                searchUserLoading: false,
            };
        case ActionTypes.NEW_CHAT_SUCCESS: {

            const otherUser = action.payload.users.find((userItem) => userItem._id !== state.user._id)

            const searchUser = state.searchUser.filter((userItem) => userItem._id !== otherUser._id)

            return {
                ...state,
                searchUser,
            };
        }
        case ActionTypes.CHECK_LOGIN_DONE:
            return {
                ...state,
                loginLoading: false,
            }
        case ActionTypes.LOGOUT_DONE:
            return {
                ...state,
                user: null,
                loginLoading: false,
            }
        default:
            return state;
    }
}