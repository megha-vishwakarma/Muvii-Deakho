import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MyImage from "../../../components/img/MyImage";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./heroBanner.scss";

const HeroBanner = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [backgroundImage, setBackgroundImage] = React.useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && searchQuery !== "") {
            navigate(`/search/${searchQuery}}`);
        }
    };

    React.useEffect(() => {
        const bgImage =
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
            console.log("img " + url.backdrop );
            console.log("imgddd " + bgImage );
        const img = `${url.backdrop}${bgImage}`;
        
        console.log("mujeeb " + img);
        setBackgroundImage(img);
    }, [data]);

    return (
        <div className="heroBanner">
            <ContentWrapper>
                
                    <div className="backdrop-img">
                        <MyImage image={backgroundImage} />
                    </div>

                    <div className="opacity-layer"></div>
            
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            onKeyUp={searchQueryHandler}
                            type="text"
                            placeholder="Search for a movie or tv show...."
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
