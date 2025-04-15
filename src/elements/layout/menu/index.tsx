import { StyledHeadline, StyledMenu } from "./styles";
import { lang } from "data/lang";
import { useMenu } from "hooks/useMenu";
import Div from "elements/components/div";
import { useStore } from "hooks/useStore";
import Link from "elements/components/link";
import Button from "elements/components/button";

const Menu = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const { isVisible } = useMenu();

    return (
        <StyledMenu $isVisible={isVisible}>
            <StyledHeadline>
                <Link
                    href="#/"
                    onClick={() => setSidebarOpen(false)}
                    underline={false}
                >
                    {lang.title}
                </Link>
            </StyledHeadline>

            <Div height="100%" display="flex" alignItems="center">
                <Button
                    iconSize="2rem"
                    iconName={sidebarOpen ? "close" : "menu"}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                />
            </Div>
        </StyledMenu>
    );
};

export default Menu;
