import Text from "elements/components/text";
import { StyledSidebar } from "./styles";
import { lang } from "data/lang";

export interface SidebarProps {
    isOpen: boolean;
    toggleTheme: () => void;
}

const Sidebar = ({ isOpen, toggleTheme }: SidebarProps) => {
    return (
        <StyledSidebar $isOpen={isOpen}>
            <Text>{lang.title}</Text>

            <Text margin="1rem 0">{lang.intro}</Text>

            <button onClick={() => toggleTheme()}>Toggle Theme</button>
        </StyledSidebar>
    );
};

export default Sidebar;
