import { Story } from "@/constants/types/story";
import * as ActionTypes from "../actionTypes";
import { ReduxAction } from "@/constants/types/redux";

interface State {
    tags: Story["tags"] | [],
    tagLoading: boolean,
}

const defaultState: State = {
    tags: [],
    tagLoading: true,
}

export default function tag(state = defaultState, action: ReduxAction) {
    switch (action.type) {
        case ActionTypes.GET_STORY_TAGS:
            return {
                ...state,
                tagLoading: true,
            };
        case ActionTypes.GET_STORY_TAGS_SUCCESS:
            return {
                ...state,
                tagLoading: false,
                tags: action.payload,
            };
        case ActionTypes.GET_STORY_TAGS_FAILED:
            return {
                ...state,
                tagLoading: false,
            };
        default:
            return state;
    }
}