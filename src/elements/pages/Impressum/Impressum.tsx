import { languageData } from "data/languageData";
import Text from "elements/components/Text/Text";

import { StyledImpressum } from "./Impressum.styles";

const Impressum = () => (
    // The legal notice text is German, so the language is declared
    <StyledImpressum lang="de">
        {languageData.impressum.map((paragraph, index) => (
            <Text key={index} margin="0 0 1rem 0">
                {paragraph}
            </Text>
        ))}
    </StyledImpressum>
);

export default Impressum;
