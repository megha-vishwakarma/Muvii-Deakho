import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/UseFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {

    const [endpoint, setEndpoint] = React.useState("movie")
    const {data, loading} = useFetch(`/${endpoint}/top_rated`)
    const onTabChange = (tab) => {
        setEndpoint(tab.toLowerCase());
    }   

    console.log(data?.results)
    return <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwitchTabs data = {["Movie", "Tv"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading = {loading}/>
        
    </div>;
};

export default TopRated;
