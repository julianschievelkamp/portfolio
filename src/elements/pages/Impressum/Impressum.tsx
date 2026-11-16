import Text from "elements/components/Text/Text";
import { StyledImpressum } from "./Impressum.styles";
import { languageData } from "data/languageData";

const Impressum = () => {
    return (
        // Der Impressum-Text ist deutsch, daher wird die Sprache ausgewiesen
        <StyledImpressum lang="de">
            <Text fontSize="0.875rem">{languageData.impressum}</Text>
        </StyledImpressum>
    );
};

export default Impressum;
