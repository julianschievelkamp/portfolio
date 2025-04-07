import Text from "elements/components/text";
import { StyledImpressum } from "./styles";
import { lang } from "data/lang";

const Impressum = () => {
    return (
        <StyledImpressum>
            <Text fontSize="0.875rem">{lang.impressum}</Text>
        </StyledImpressum>
    );
};

export default Impressum;
