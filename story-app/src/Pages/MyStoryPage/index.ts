import { connect, ConnectedProps } from "react-redux";

import MyStoryPage from "./MyStoryPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'

const mapStateToProps = (state: RootState) => ({
    myLikedStoryList: state.story.myLikedStoryList,
    myFollowStoryList: state.story.myFollowStoryList,
});

const mapDispatchToProps = {
    getMyLikedStoryList: () => ({
        type: ActionTypes.GET_MY_LIKED_STORY,
    }),
    getMyFollowStoryList: () => ({
        type: ActionTypes.GET_MY_FOLLOW_STORY,
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MyStoryPage)