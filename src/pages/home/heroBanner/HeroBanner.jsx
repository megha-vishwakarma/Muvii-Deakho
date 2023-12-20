import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux/es/hooks/useSelector";

const HeroBanner = () => {

    const [searchQuery, setSearchQuery] = React.useState("");
    const [backgroundImage, setBackgroundImage] = React.useState("");
    const navigate = useNavigate();
    const {url} =  useSelector((state) => state.home)
    const {data, loading} = useFetch("/movie/upcoming");
    

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && searchQuery !== "") {
            navigate(`/search/${searchQuery}}`);
        }
    };

    React.useEffect(() => {
        const bgImage = data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
        setBackgroundImage(url.backdrop +  bgImage);
        console.log(backgroundImage);

    }, [data])

    return (
        <div className="heroBanner">
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">
                    Millions of movies, TV shows and people to discover. Explore
                    now.
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
        </div>
    );
};

export default HeroBanner;
