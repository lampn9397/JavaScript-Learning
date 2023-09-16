import { connect, ConnectedProps } from "react-redux";

import AuthorPage from "./AuthorPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'
import { Author } from "@/constants/types/author";

const mapStateToProps = (state: RootState) => ({
    authorDetail: state.author.authorDetail,
    storyByAuthorList: state.story.storyByAuthorList,
});

const mapDispatchToProps = {
    getAuthorDetail: (id: Author["_id"]) => ({
        type: ActionTypes.GET_AUTHOR_DETAIL,
        payload: {
            id,
        }
    }),
    getStoryByAuthor: (authorId: string) => ({
        type: ActionTypes.GET_STORY_BY_AUTHOR,
        payload: {
            authorId,
            sort: "totalViews",
            page: 1,
            limit: 999,
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AuthorPage)