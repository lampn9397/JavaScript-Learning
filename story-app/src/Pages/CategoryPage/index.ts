import { connect, ConnectedProps } from "react-redux";

import CategoryPage from "./CategoryPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'
import { Author } from "@/constants/types/author";

const mapStateToProps = (state: RootState) => ({
    authorDetail: state.author.authorDetail,
    storyByAuthorList: state.story.storyByAuthorList,
});

const mapDispatchToProps = {
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CategoryPage)