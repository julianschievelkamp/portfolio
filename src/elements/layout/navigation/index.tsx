import { Page, pages, links } from "data/navigationData";
import { NavElement, NavLink, NavList, StyledNavigation } from "./styles";
import { languageData } from "data/languageData";
import Text from "elements/components/text";
import { useStore } from "hooks/useStore";
import { colors } from "styles/variables";

export interface NavigationProps {
    page: Page;
}

const Navigation = ({ page }: NavigationProps) => {
    const { setSidebarOpen } = useStore();

    return (
        <StyledNavigation>
            <Text
                color={colors.secondary}
                margin="0 0 0.5rem 0"
                fontSize="0.875rem"
            >
                {languageData.work}
            </Text>
            <NavList>
                {Object.keys(pages).map((key) => {
                    const { path, name } = pages[key];
                    const isActive = path === page.path;

                    return (
                        <NavElement key={name}>
                            <NavLink
                                $isActive={isActive}
                                href={path}
                                onClick={() => {
                                    if (!isActive) {
                                        setSidebarOpen(false);
                                    }
                                }}
                            >
                                <Text
                                    bold={isActive}
                                    color={isActive ? "black" : undefined}
                                >
                                    {name}
                                </Text>
                            </NavLink>
                        </NavElement>
                    );
                })}
            </NavList>

            <Text
                color={colors.secondary}
                margin="0.5rem 0"
                fontSize="0.875rem"
            >
                {languageData.links}
            </Text>
            <NavList>
                {Object.keys(links).map((key) => {
                    const { path, name } = links[key];

                    return (
                        <NavElement key={name}>
                            <NavLink href={path} target="_blank">
                                <Text>{name}</Text>
                            </NavLink>
                        </NavElement>
                    );
                })}
            </NavList>
        </StyledNavigation>
    );
};

export default Navigation;
