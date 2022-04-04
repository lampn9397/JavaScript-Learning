import * as ActionTypes from "../actionTypes";

const defaultState = {
    musicRankList: [],
    loading: true,
};

export default function songRankReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_MUSICRANK:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.GET_MUSICRANK_SUCCESS:
            return {
                ...state,
                loading: false,
                musicRankList: action.payload,
            };
        case ActionTypes.GET_MUSICRANK_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}