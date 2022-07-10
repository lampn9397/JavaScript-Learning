import * as ActionTypes from "../actionTypes";

const defaultState = {
    conversations: [],
    searchConversation: [],
    conversationsLoading: true,
    selectedConversation: null,
    conversationIdLoading: true,
    messages: [],
    loadMore: false,
    messagesLoading: false,
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
        case ActionTypes.UPDATE_CONVERSATION: {

            let conversations = [...state.conversations]

            const index = conversations.findIndex((item) => item._id === action.payload._id)

            if (index !== -1) {
                conversations.splice(index, 1)
            }

            conversations = [action.payload, ...conversations]

            return {
                ...state,
                conversations
            };
        }
        case ActionTypes.SEARCHCONVERSATIONS:
            return {
                ...state,
                conversationsLoading: !!action.payload,
                searchConversation: [],
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
                loadMore: action.page > 1,
                messagesLoading: action.page === 1,
            };
        case ActionTypes.GET_MESSAGES_SUCCESS: {

            if (action.page > 1) {
                return {
                    ...state,
                    loadMore: false,
                    messages: [...state.messages, ...action.payload]
                }
            }

            return {
                ...state,
                loadMore: false,
                messagesLoading: false,
                messages: action.payload,
            };
        }
        case ActionTypes.GET_MESSAGES_FAILED:
            return {
                ...state,
                loadMore: false,
                messagesLoading: false,
            };
        case ActionTypes.RESET_MESSAGES:
            return {
                ...state,
                messages: [],
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
                messages: [action.payload, ...state.messages]
            };
        case ActionTypes.SEND_MESSAGES_FAILED:
            return {
                ...state,
                sendMessagesLoading: false,
            };
        case ActionTypes.LOGOUT_DONE:
            return defaultState
        default:
            return state;
    }
}