import { connect, ConnectedProps } from "react-redux";

import CategoryPage from "./CategoryPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'
import { Story } from "@/constants/types/story";

interface GetStoryPayload {
    stateName: string,
    page?: number,
    limit?: number,
    sort?: string,
    status?: Story["status"],
    category?: Story["category"]
}

const mapStateToProps = (state: RootState) => ({
    categories: state.category.categories,
    topFiveStories: state.story.topFiveStories,
    newStories: state.story.newStories,
    newStoryList: state.story.newStoryList,
    storyViewsRankingList: state.story.storyViewsRankingList,
    storyLikesRankingList: state.story.storyLikesRankingList,
    storyFollowsRankingList: state.story.storyFollowsRankingList,
    newCompleteStory: state.story.newCompleteStory,
});

const mapDispatchToProps = {
    getStories: ({ stateName, page = 1, limit = 5, sort, status, category }: GetStoryPayload) => ({
        type: ActionTypes.GET_STORIES,
        payload: {
            stateName,
            page,
            limit,
            sort,
            status,
            category,
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CategoryPage)