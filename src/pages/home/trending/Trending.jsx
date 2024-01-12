import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/UseFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {

    const [endpoint, setEndpoint] = React.useState("day")
    const {data, loading} = useFetch(`/trending/all/${endpoint}`)
    const onTabChange = (tab) => {
        setEndpoint(tab.toLowerCase());
    }   

    console.log(data?.results)
    return <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data = {["Day", "Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading = {loading}/>
        
    </div>;
};

export default Trending;
