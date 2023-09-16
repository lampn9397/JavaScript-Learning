import React from 'react';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import styles from './style.module.scss'
import { publicRoutes } from '../../constants';
import NewUpdatedStory from '../../components/NewUpdatedStory';
import NewStoryDetailList from '../../components/NewStoryDetailList';
import StoryRankingList from '../../components/StoryRankingList';
import NewCompleteStory from '../../components/NewCompleteStory';
import { ReduxProps } from '.';
import { useParams } from 'react-router-dom';

interface Props extends ReduxProps { }

function CategoryPage({
    getStories,
    newStories,
    newStoryList,
    storyViewsRankingList,
    storyLikesRankingList,
    storyFollowsRankingList,
    newCompleteStory,

}: Props) {
    const { slug }: any = useParams();

    React.useEffect(() => {
        getStories({ stateName: "newStories", page: 1, limit: 10, sort: "storyUpdateAt", category: slug })
        getStories({ stateName: "newStoryList", page: 1, limit: 6, sort: "storyUpdateAt", category: slug })
        getStories({ stateName: "storyViewsRankingList", page: 1, limit: 10, sort: "totalViews", category: slug })
        getStories({ stateName: "storyLikesRankingList", page: 1, limit: 10, sort: "totalLikes", category: slug })
        getStories({ stateName: "storyFollowsRankingList", page: 1, limit: 10, sort: "totalFollows", category: slug })
        getStories({ stateName: "newCompleteStory", page: 1, limit: 5, status: "COMPLETED", category: slug })
    }, [getStories, slug]);

    return (
        <div className={styles.categoryPageContainer}>
            <Header />
            <NavBar />
            <div className='resolution'>
                <div className='flex'>
                    <NewUpdatedStory stories={newStories} sort={"storyUpdateAt"} category={slug} />
                    <NewStoryDetailList stories={newStoryList} />
                </div>
                <div className={`${styles.storyRankingSectionContainer} flex`}>
                    <StoryRankingList
                        title='Xem Nhiều'
                        moreLink={publicRoutes.FilterPage({ ranking: "totalViews", category: slug }).path}
                        stories={storyViewsRankingList}
                        countField={"totalViews"}
                        topOneType={"Lượt Xem"}
                    />
                    <StoryRankingList
                        title='Lượt Thích'
                        moreLink={publicRoutes.FilterPage({ ranking: "totalLikes", category: slug }).path}
                        stories={storyLikesRankingList}
                        countField={"totalLikes"}
                        topOneType={"Lượt Thích"}
                    />
                    <StoryRankingList
                        title='Lượt Theo Dõi'
                        moreLink={publicRoutes.FilterPage({ ranking: "totalFollows", category: slug }).path}
                        stories={storyFollowsRankingList}
                        countField={"totalFollows"}
                        topOneType={"Lượt Theo Dõi"}
                    />
                </div>
                <NewCompleteStory stories={newCompleteStory} category={slug} />
            </div>
        </div>
    )
}

export default CategoryPage;