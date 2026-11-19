import { memo } from "react";
import { Page, pages, links } from "data/navigationData";
import {
    NavElement,
    NavLink,
    NavList,
    StyledNavigation,
} from "./Navigation.styles";
import { languageData } from "data/languageData";
import Text from "elements/components/Text/Text";
import { useStore } from "hooks/useStore";
import { colors } from "styles/variables";

export interface NavigationProps {
    page: Page;
}

const Navigation = ({ page }: NavigationProps) => {
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    return (
        <StyledNavigation aria-label="Navigation">
            <Text
                id="navigation-work"
                color={colors.secondary}
                margin="0 0 0.5rem 0"
                toUpperCase
            >
                {languageData.sidebar.work}
            </Text>
            <NavList role="list" aria-labelledby="navigation-work">
                {Object.values(pages).map(({ path, name }) => {
                    const isActive = path === page.path;

                    return (
                        <NavElement key={name}>
                            <NavLink
                                $isActive={isActive}
                                href={path}
                                ariaCurrent={isActive ? "page" : undefined}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Text
                                    bold={isActive}
                                    color={isActive ? "black" : undefined}
                                    fontSize="1rem"
                                >
                                    {name}
                                </Text>
                            </NavLink>
                        </NavElement>
                    );
                })}
            </NavList>

            <Text
                id="navigation-links"
                color={colors.secondary}
                margin="0.5rem 0"
                toUpperCase
            >
                {languageData.sidebar.links}
            </Text>
            <NavList role="list" aria-labelledby="navigation-links">
                {Object.values(links).map(({ path, name }) => (
                    <NavElement key={name}>
                        <NavLink href={path} target="_blank">
                            <Text fontSize="1rem">{name}</Text>
                        </NavLink>
                    </NavElement>
                ))}
            </NavList>
        </StyledNavigation>
    );
};

export default memo(Navigation);
