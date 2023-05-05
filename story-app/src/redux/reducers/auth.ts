import { ReduxAction } from "@/constants/types/redux";

import * as ActionTypes from "../actionTypes";

const fakeUser = {
    "_id": "63739a2f4bb8a51963956509",
    "username": "tri145",
    "email": "tri14@gmail.com",
    "name": "tri",
    "gender": "MALE",
    "avatar": "http://localhost:3001https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    "recoveryPasswordCode": "",
    "lastLogin": "2022-11-15T13:54:55.305Z"
}

const defaultState = {
    user: null,
    isModalOpen: false
}

export default function authReducer(state = defaultState, action: ReduxAction) {
    switch (action.type) {
        case ActionTypes.TOGGLE_AUTH_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
            }
        default:
            return state;
    }
}