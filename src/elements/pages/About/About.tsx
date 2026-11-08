import { StyledAbout } from "./About.styles";

import Artist from "./Artist/Artist";
import References from "./References/References";
import Badges from "./Badges/Badges";

const About = () => {
    return (
        <StyledAbout>
            <Artist />
            <References />
            <Badges />
        </StyledAbout>
    );
};

export default About;
