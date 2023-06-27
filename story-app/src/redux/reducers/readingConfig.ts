import { ReduxAction } from "@/constants/types/redux";
import { BackgroundColor, Font, Fontsize } from "../../constants/types/theme"

import * as ActionTypes from "../actionTypes";
interface State {
    theme: BackgroundColor,
    font: Font,
    fontSize: Fontsize,
}

const defaultState: State = {
    theme: BackgroundColor.L_WHITE,
    font: Font.ARIAL,
    fontSize: Fontsize.S24
}

export default function readingConfig(state = defaultState, action: ReduxAction) {
    switch (action.type) {
        case ActionTypes.SET_READING_CONFIG:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            }
        default:
            return state;
    }
}