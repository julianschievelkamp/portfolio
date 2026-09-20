import { StyledHeadline, StyledMenu } from "./styles";
import { languageData } from "data/languageData";
import { useMenu } from "hooks/useMenu";
import Div from "elements/components/div";
import { useStore } from "hooks/useStore";
import Link from "elements/components/link";
import Button from "elements/components/button";
import Icon from "elements/components/icon";

const Menu = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const { isVisible } = useMenu();

    return (
        <StyledMenu $isVisible={isVisible}>
            <StyledHeadline>
                <Link
                    href="/"
                    onClick={() => setSidebarOpen(false)}
                    underline={false}
                >
                    {languageData.title}
                </Link>
            </StyledHeadline>

            <Div
                height="100%"
                display="flex"
                alignItems="center"
                margin="0 0 0 2rem"
            >
                <Button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    ariaLabel="Toggle Sidebar"
                >
                    <Icon name={sidebarOpen ? "close" : "menu"} size="2rem" />
                </Button>
            </Div>
        </StyledMenu>
    );
};

export default Menu;
