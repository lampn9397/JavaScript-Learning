import { connect, ConnectedProps } from "react-redux";

import MyStoryAuthorPage from "./MyStoryAuthorPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'

const mapStateToProps = (state: RootState) => ({
    myStoryAuthorList: state.author.myStoryAuthorList,
    myStoryAuthorListLoading: state.author.myStoryAuthorListLoading,
});

const mapDispatchToProps = {
    getMyStoryAuthors: (page?: 1, limit?: 9999) => ({
        type: ActionTypes.GET_MY_STORY_AUTHORS,
        payload: {
            page,
            limit,
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MyStoryAuthorPage)