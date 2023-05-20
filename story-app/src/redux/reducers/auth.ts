import { ReduxAction } from "@/constants/types/redux";

import * as ActionTypes from "../actionTypes";

const defaultState = {
    user: null,
    isModalOpen: false,
    authLoading: false,
    checkLoginLoading: true,
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