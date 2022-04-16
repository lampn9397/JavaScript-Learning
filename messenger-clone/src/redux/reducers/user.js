import * as ActionTypes from "../actionTypes";

const defaultState = {
    user: null,
    loading: true,

};

export default function homeMusicReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_USERINFO:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.GET_USERINFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case ActionTypes.GET_USERINFO_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}