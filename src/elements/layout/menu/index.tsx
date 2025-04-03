import Text from "elements/components/text";
import { StyledMenu } from "./styles";
import { lang } from "data/lang";
import { useMenu } from "hooks/useMenu";

export interface MenuProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Menu = ({ sidebarOpen, setSidebarOpen }: MenuProps) => {
    const { isVisible } = useMenu();

    return (
        <StyledMenu $isVisible={isVisible}>
            <Text>{lang.title}</Text>

            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                Toggle Sidebar
            </button>
        </StyledMenu>
    );
};

export default Menu;
