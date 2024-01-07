import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = React.useState("");

    const controlNavBar = () => {
        const currentScrollY = window.scrollY;
        if(currentScrollY > 200) {
            if(currentScrollY > lastScrollY) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(currentScrollY);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    useEffect( () => {
        window.addEventListener("scroll", controlNavBar)
        return window.removeEventListener("scroll", controlNavBar)

    }, lastScrollY)

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && searchQuery !== "") {
            navigate(`/search/${searchQuery}}`);
        }

        setTimeout(() => {
            setShowSearch(false);
        }, 1000);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (path) => {
        navigate(`explore/${path}`);
        setMobileMenu(false);
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <ul className="menuItems">
                    <li className="menuItem" onClick={() => {navigationHandler("movie")}}>Movies</li>
                    <li className="menuItem" onClick={() => {navigationHandler("tv")}}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={() => openSearch()}/>
                    </li>
                </ul>

                <div className="mobileMenuItems ">
                    <HiOutlineSearch onClick={() => openSearch()} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu()} />
                    ) : (
                        <SlMenu onClick={() => openMobileMenu()} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                                onKeyUp={searchQueryHandler}
                                type="text"
                                placeholder="Search for a movie or tv show...."
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
