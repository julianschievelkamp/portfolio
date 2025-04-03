import Text from "elements/components/text";
import { StyledSidebar } from "./styles";
import { lang } from "data/lang";
import Div from "elements/components/div";

export interface SidebarProps {
    isOpen: boolean;
    toggleTheme: () => void;
}

const Sidebar = ({ isOpen, toggleTheme }: SidebarProps) => {
    return (
        <StyledSidebar $isOpen={isOpen}>
            <Text>{lang.title}</Text>

            <Text margin="1rem 0">{lang.intro}</Text>

            <Div>
                <button onClick={() => toggleTheme()}>Toggle Theme</button>

                <Text margin="1rem 0 0 0">{lang.copyright}</Text>
            </Div>
        </StyledSidebar>
    );
};

export default Sidebar;
