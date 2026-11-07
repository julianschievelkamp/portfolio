import { StyledJulian } from "./styles";

import Artist from "./artist";
import References from "./references";
import Badges from "./badges";

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
