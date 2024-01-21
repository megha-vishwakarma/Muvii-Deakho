import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "./style.scss";

const ErrorSection = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default ErrorSection;
