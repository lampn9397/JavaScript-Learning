import * as ActionTypes from "../actionTypes";

const defaultState = {
    conversations: [],
    searchConversation: [],
    conversationsLoading: true,
    selectedConversation: null,
    conversationIdLoading: true,
    messages: [],
    messagesLoading: true,
    sendMessagesLoading: false,
};

export default function chatReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_CONVERSATIONS:
            return {
                ...state,
                conversationsLoading: true,
            };
        case ActionTypes.GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversationsLoading: false,
                conversations: action.payload,
            };
        case ActionTypes.GET_CONVERSATIONS_FAILED:
            return {
                ...state,
                conversationsLoading: false,
            };
        case ActionTypes.SEARCHCONVERSATIONS:
            return {
                ...state,
                conversationsLoading: true,
            };
        case ActionTypes.SEARCHCONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversationsLoading: false,
                searchConversation: action.payload,
            };
        case ActionTypes.SEARCHCONVERSATIONS_FAILED:
            return {
                ...state,
                conversationsLoading: false,
            };
        case ActionTypes.GET_CONVERSATIONID:
            return {
                ...state,
                conversationIdLoading: true,
            };
        case ActionTypes.GET_CONVERSATIONID_SUCCESS:
            return {
                ...state,
                conversationIdLoading: false,
                selectedConversation: action.payload,
            };
        case ActionTypes.GET_CONVERSATIONID_FAILED:
            return {
                ...state,
                conversationIdLoading: false,
            };
        case ActionTypes.GET_MESSAGES:
            return {
                ...state,
                messagesLoading: true,
            };
        case ActionTypes.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messagesLoading: false,
                messages: action.payload,
            };
        case ActionTypes.GET_MESSAGES_FAILED:
            return {
                ...state,
                messagesLoading: false,
            };
        case ActionTypes.SEND_MESSAGES:
            return {
                ...state,
                sendMessagesLoading: true,
            };
        case ActionTypes.SEND_MESSAGES_SUCCESS:
            return {
                ...state,
                sendMessagesLoading: false,
                messages: [...state.messages, action.payload]
            };
        case ActionTypes.SEND_MESSAGES_FAILED:
            return {
                ...state,
                sendMessagesLoading: false,
            };
        default:
            return state;
    }
}