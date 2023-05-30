import * as ActionTypes from "../actionTypes";

const defaultState = {
    commentList: [],
    commentListLoading: true,
    commentLoading: true,
}

export default function commentReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_COMMENTS:
            return {
                ...state,
                commentListLoading: true,
            };
        case ActionTypes.GET_COMMENTS_SUCCESS: {
            let commentList = action.payload.results

            if (action.payload.page > 1) {
                commentList = [...state.commentList, ...commentList]
            }

            return {
                ...state,
                commentListLoading: false,
                commentList
            }
        }
        case ActionTypes.GET_COMMENTS_FAILED:
            return {
                ...state,
                commentListLoading: false,
            };
        case ActionTypes.SEND_COMMENT:
            return {
                ...state,
                commentLoading: true,
            };
        case ActionTypes.LIKE_COMMENT_SUCCESS:
        case ActionTypes.SEND_COMMENT_SUCCESS: {
            let commentList = [...state.commentList]

            const commentItem = action.payload.results

            if (commentItem.parentComment) {
                //comment con

                const commentIndex = commentList.findIndex((item) => item._id === commentItem.parentComment)

                const commentChildItemIndex = commentList[commentIndex].childComments.findIndex((item) => item._id === commentItem._id)

                if (commentChildItemIndex !== -1) {
                    commentList[commentIndex].childComments[commentChildItemIndex] = commentItem //cap nhat comment con
                } else {
                    commentList[commentIndex].childComments = [commentItem, ...commentList[commentIndex].childComments] //them comment con 
                }
            } else {
                const commentItemIndex = commentList.findIndex((item) => item._id === commentItem._id)

                if (commentItemIndex !== -1) {
                    commentList[commentItemIndex] = commentItem //cap nhat comment cha
                } else {
                    commentList = [commentItem, ...commentList] //them comment cha
                }
            }

            return {
                ...state,
                commentLoading: false,
                commentList
            }
        }
        case ActionTypes.SEND_COMMENT_FAILED:
            return {
                ...state,
                commentLoading: false,
            };
        default:
            return state;
    }
}