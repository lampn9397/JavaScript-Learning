import * as ActionTypes from "../actionTypes";

const defaultState = {
    user: null,
    loginLoading: true,

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