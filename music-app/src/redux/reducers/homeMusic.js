import * as ActionTypes from "../actionTypes";

const defaultState = {
    musicList: [],
    musicDetail: {},
    allSong: [],
    slideSong: [],
    loading: true,
    loadingDetail: true,
    loadingAllSong: true,
    slideLoading: true,
    selectedMusic: null,
};

export default function homeMusicReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_MUSICS:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.GET_MUSICS_SUCCESS:
            return {
                ...state,
                loading: false,
                musicList: action.payload,
            };
        case ActionTypes.GET_MUSICS_FAILED:
            return {
                ...state,
                loading: false,
            };
        case ActionTypes.GET_MUSICDETAIL:
            return {
                ...state,
                loadingDetail: true,
            };
        case ActionTypes.GET_MUSICDETAIL_SUCCESS:
            return {
                ...state,
                loadingDetail: false,
                musicDetail: action.payload,
            };
        case ActionTypes.GET_MUSICDETAIL_FAILED:
            return {
                ...state,
                loadingDetail: false,
            };
        case ActionTypes.GET_ALLSONG:
            return {
                ...state,
                loadingAllSong: true,
            };
        case ActionTypes.GET_ALLSONG_SUCCESS:
            return {
                ...state,
                loadingAllSong: false,
                allSong: action.payload,
            };
        case ActionTypes.GET_ALLSONG_FAILED:
            return {
                ...state,
                loadingAllSong: false,
            };
        case ActionTypes.GET_HOTSONGFORSLIDE:
            return {
                ...state,
                slideLoading: true,
            };
        case ActionTypes.GET_HOTSONGFORSLIDE_SUCCESS:
            return {
                ...state,
                slideLoading: false,
                slideSong: action.payload,
            };
        case ActionTypes.GET_HOTSONGFORSLIDE_FAILED:
            return {
                ...state,
                slideLoading: false,
            };
        default:
            return state;
    }
}