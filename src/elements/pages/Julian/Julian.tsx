import { StyledJulian } from "./Julian.styles";

import Artist from "./Artist/Artist";
import References from "./References/References";
import Badges from "./Badges/Badges";

const Julian = () => {
    return (
        <StyledJulian>
            <Artist />
            <References />
            <Badges />
        </StyledJulian>
    );
};

export default Julian;
