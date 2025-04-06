import Text from "elements/components/text";
import { StyledMenu } from "./styles";
import { lang } from "data/lang";
import { useMenu } from "hooks/useMenu";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Div from "elements/components/div";
import { useStore } from "hooks/useStore";
import Icon from "elements/components/icon";

const Menu = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const { isVisible } = useMenu();

    const isMd = useMediaQuery(queries.md);

    return (
        <StyledMenu $isVisible={isVisible}>
            <Text type="headline" fontSize={isMd ? "1.5rem" : "1.25rem"}>
                {lang.title}
            </Text>

            <Div height="100%" display="flex" alignItems="center">
                <Icon
                    size="2rem"
                    name={sidebarOpen ? "close" : "menu"}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                />
            </Div>
        </StyledMenu>
    );
};

export default Menu;
