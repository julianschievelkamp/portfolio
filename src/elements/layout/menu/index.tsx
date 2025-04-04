import Text from "elements/components/text";
import { StyledIcon, StyledMenu } from "./styles";
import { lang } from "data/lang";
import { useMenu } from "hooks/useMenu";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Div from "elements/components/div";

export interface MenuProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Menu = ({ sidebarOpen, setSidebarOpen }: MenuProps) => {
    const { isVisible } = useMenu();
    const isMd = useMediaQuery(queries.md);

    return (
        <StyledMenu $isVisible={isVisible}>
            <Text type="headline" fontSize={isMd ? "1.5rem" : "1.25rem"}>
                {lang.title}
            </Text>

            <Div height="100%" display="flex" alignItems="center">
                <StyledIcon
                    size="2rem"
                    name={sidebarOpen ? "close" : "menu"}
                    onClick={() => !sidebarOpen && setSidebarOpen(true)}
                />
            </Div>
        </StyledMenu>
    );
};

export default Menu;
