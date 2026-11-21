import { languageData } from "data/languageData";
import Text from "elements/components/Text/Text";

import { StyledImpressum } from "./Impressum.styles";

const Impressum = () => (
    // The legal notice text is German, so the language is declared
    <StyledImpressum lang="de">
        <Text>{languageData.impressum}</Text>
    </StyledImpressum>
);

export default Impressum;
