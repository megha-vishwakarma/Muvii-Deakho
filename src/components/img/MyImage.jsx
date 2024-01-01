import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyImage = ({ image }) => (
    <LazyLoadImage  effect="blur" src={image} />
);

export default MyImage;