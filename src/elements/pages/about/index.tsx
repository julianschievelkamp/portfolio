import { StyledAbout } from "./styles";

import Artist from "./parts/artist";
import References from "./parts/references";
import Badges from "./parts/badges";

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
