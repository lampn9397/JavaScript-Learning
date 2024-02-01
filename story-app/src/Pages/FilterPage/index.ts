import { connect, ConnectedProps } from "react-redux";

import FilterPage from "./FilterPage";
import { RootState } from "@/redux/store";
import * as ActionTypes from '../../redux/actionTypes'
import { Author } from "@/constants/types/author";
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
    authorDetail: state.author.authorDetail,
    storyByAuthorList: state.story.storyByAuthorList,
    categories: state.category.categories,
});

const mapDispatchToProps = {
    getCategories: () => ({
        type: ActionTypes.GET_CATEGORIES,
    }),

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

export default connector(FilterPage)