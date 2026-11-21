import { languageData } from "data/languageData";
import Text from "elements/components/Text/Text";

import { StyledImpressum } from "./Impressum.styles";

const Impressum = () => (
    // Der Impressum-Text ist deutsch, daher wird die Sprache ausgewiesen
    <StyledImpressum lang="de">
        <Text>{languageData.impressum}</Text>
    </StyledImpressum>
);

export default Impressum;
