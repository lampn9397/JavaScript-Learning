import { connect, ConnectedProps } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import DetailChapterPage from "./DetailChapterPage";
import { RootState } from "@/redux/store";

const mapStateToProps = (state: RootState) => ({
    chapterDetail: state.chapterDetail.chapterDetail,
    chapterDetailLoading: state.chapterDetail.chapterDetailLoading,
    chapterList: state.chapter.chapterList,
    chapterListLoading: state.chapter.chapterListLoading,
});

const mapDispatchToProps = {
    getChapterDetail: (slug: string, chapterNumber: string) => ({
        type: ActionTypes.GET_CHAPTER_DETAIL,
        payload: {
            slug,
            chapterNumber
        }
    }),

    getChapterList: (slug: string, stateName: string, page = 1, limit = 100, sort = "", sortType = "") => ({
        type: ActionTypes.GET_CHAPTERS,
        payload: {
            slug,
            stateName,
            page,
            limit,
            sort,
            sortType,
        }
    }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DetailChapterPage)