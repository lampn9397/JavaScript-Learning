import { connect, ConnectedProps } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import CreateStoryPage from "./UpdateMyStoryPage";
import { RootState } from "@/redux/store";
import { Story } from "@/constants/types/story";
import { ImageFile } from "@/components/ImageFilePreview";
import { pageLimit } from "../../constants";

const mapStateToProps = (state: RootState) => ({
    storyGenres: state.story.storyGenres,
    categories: state.category.categories,
    tags: state.tag.tags,
    authors: state.author.authorList,
    detail: state.storyDetail.detail,
    detailLoading: state.storyDetail.detailLoading,
});

const mapDispatchToProps = {
    getStoryGenre: () => ({
        type: ActionTypes.GET_STORY_GENRE
    }),

    getstoryDetail: (payload: any) => ({
        type: ActionTypes.GET_STORY_DETAIL,
        payload
    }),

    getStoryCategories: () => ({
        type: ActionTypes.GET_CATEGORIES
    }),

    getTags: () => ({
        type: ActionTypes.GET_STORY_TAGS
    }),

    getAuthors: (name = "", page = 1, limit = pageLimit) => ({
        type: ActionTypes.GET_AUTHORS,
        payload: {
            name,
            page,
            limit,
        }
    }),

    createStory: (
        name: Story["name"],
        author: Story["author"]["name"],
        genre: Story["genre"]["_id"],
        category: Story["category"]["_id"],
        tags: Story["tags"][0]["_id"][],
        poster: ImageFile["fileSend"],
        description: Story["description"]
    ) => ({
        type: ActionTypes.CREATE_STORY,
        payload: {
            name,
            author,
            genre,
            category,
            tags,
            poster,
            description
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CreateStoryPage)