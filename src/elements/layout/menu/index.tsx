import Text from "elements/components/text";
import { StyledMenu } from "./styles";
import { lang } from "data/lang";
import { useMenu } from "hooks/useMenu";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";

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

            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ width: "5rem" }}
            >
                Toggle Sidebar
            </button>
        </StyledMenu>
    );
};

export default Menu;
