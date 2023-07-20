import { ReduxAction } from "@/constants/types/redux";

import * as ActionTypes from "../actionTypes";
import { User } from "@/constants/types/user";

interface State {
    user: User | null,
    isModalOpen: boolean,
    authLoading: boolean,
    checkLoginLoading: boolean,
    updateProfileLoading: boolean,
}

const defaultState: State = {
    user: null,
    isModalOpen: false,
    authLoading: false,
    checkLoginLoading: true,
    updateProfileLoading: true,
}

export default function authReducer(state = defaultState, action: ReduxAction) {
    switch (action.type) {
        case ActionTypes.TOGGLE_AUTH_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
            }
        case ActionTypes.REGISTER:
            return {
                ...state,
                authLoading: true,
            }
        case ActionTypes.REGISTER_FAILED:
            return {
                ...state,
                authLoading: false,
            }
        case ActionTypes.GET_USER_INFOR:
            return {
                ...state,
                authLoading: true,
            }
        case ActionTypes.GET_USER_INFOR_SUCCESS:
            return {
                ...state,
                authLoading: false,
                isModalOpen: false,
                user: action.payload,
                checkLoginLoading: false,
            }
        case ActionTypes.GET_USER_INFOR_FAILED:
            return {
                ...state,
                authLoading: false,
                checkLoginLoading: false,
            }
        case ActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                updateProfileLoading: true,
            }
        case ActionTypes.UPDATE_PROFILE_SUCCESS: {
            let user = { ...state.user }

            if (action.payload.avatar) {
                user.avatar = action.payload.avatar.filePreview
            } else {
                user = { ...state.user, ...action.payload }
            }

            return {
                ...state,
                updateProfileLoading: false,
                user,
            }
        }
        case ActionTypes.UPDATE_PROFILE_FAILED:
            return {
                ...state,
                updateProfileLoading: false,
            }
        case ActionTypes.CHECK_LOGIN_DONE:
            return {
                ...state,
                checkLoginLoading: false,
            }
        case ActionTypes.CHECK_LOG_OUT_DONE:
            return {
                ...state,
                checkLoginLoading: false,
                user: null,
            }
        default:
            return state;
    }
}