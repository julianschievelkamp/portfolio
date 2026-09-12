import { StyledJulian } from "./styles";

import Artist from "./parts/artist";
import References from "./parts/references";
import Badges from "./parts/badges";

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
