import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import styles from './style.module.css'
import { publicRoutes } from '../../constants';
import CategoryBar from '../../components/CategoryBar';
import AppCarousel from '../../components/AppCarousel';
import CreateStoryCard from '../../components/CreateStoryCard';
import NewUpdatedStory from '../../components/NewUpdatedStory';
import NewStoryDetailList from '../../components/NewStoryDetailList';
import StoryRankingList from '../../components/StoryRankingList';
import NewCompleteStory from '../../components/NewCompleteStory';

function HomePage({
    categories,
    getCategories,
    topFiveStories,
    getStories,
    newStories,
    newStoryList,
    storyViewsRankingList,
    storyLikesRankingList,
    storyFollowsRankingList,
    newCompleteStory,

}) {
    const history = useHistory();

    React.useEffect(() => {
        getCategories()
        getStories("topFiveStories", 1, 5, "totalViews")
        getStories("newStories", 1, 10, "storyUpdateAt")
        getStories("newStoryList", 1, 6, "storyUpdateAt")
        getStories("storyViewsRankingList", 1, 10, "totalViews")
        getStories("storyLikesRankingList", 1, 10, "totalLikes")
        getStories("storyFollowsRankingList", 1, 10, "totalFollows")
        getStories("newCompleteStory", 1, 5, "", "COMPLETED")
    }, [getCategories, getStories]);

    const onClickButton = () => {
        history.push(publicRoutes.DetailPage.path)
    }

    return (
        <div className={styles.homePageContainer}>
            <Header />
            <NavBar />
            <div className='resolution'>
                <div className='flex'>
                    <CategoryBar categories={categories} />
                    <AppCarousel stories={topFiveStories} />
                    <CreateStoryCard />
                </div>
                <div className='flex'>
                    <NewUpdatedStory stories={newStories} />
                    <NewStoryDetailList stories={newStoryList} />
                </div>
                <div className={`${styles.storyRankingSectionContainer} flex`}>
                    <StoryRankingList
                        title='Xem Nhiều'
                        moreLink={publicRoutes.FilterPage({ ranking: "totalViews" }).path}
                        stories={storyViewsRankingList}
                        countField={"totalViews"}
                        topOneType={"Lượt Xem"}
                    />
                    <StoryRankingList
                        title='Lượt Thích'
                        moreLink={publicRoutes.FilterPage({ ranking: "totalLikes" }).path}
                        stories={storyLikesRankingList}
                        countField={"totalLikes"}
                        topOneType={"Lượt Thích"}
                    />
                    <StoryRankingList
                        title='Lượt Theo Dõi'
                        moreLink={publicRoutes.FilterPage({ ranking: "totalFollows" }).path}
                        stories={storyFollowsRankingList}
                        countField={"totalFollows"}
                        topOneType={"Lượt Theo Dõi"}
                    />
                </div>
                <NewCompleteStory stories={newCompleteStory} />
            </div>
        </div>
    )
}

HomePage.propTypes = {
    categories: PropTypes.instanceOf(Array).isRequired,
    getCategories: PropTypes.func.isRequired,
}

HomePage.defaultProps = {

}

export default HomePage;