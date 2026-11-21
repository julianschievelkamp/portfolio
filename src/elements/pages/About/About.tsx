import { StyledAbout } from "./About.styles";
import Artist from "./Artist/Artist";
import Badges from "./Badges/Badges";
import References from "./References/References";

const About = () => (
    <StyledAbout>
        <Artist />
        <References />
        <Badges />
    </StyledAbout>
);

export default About;
