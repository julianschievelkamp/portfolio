import { memo } from "react";

import { languageData } from "data/languageData";
import { links, type Page, pages } from "data/navigationData";
import Text from "elements/components/Text/Text";
import { useStore } from "hooks/useStore";
import { colors } from "styles/variables";

import {
    NavElement,
    NavLink,
    NavList,
    StyledNavigation,
} from "./Navigation.styles";

interface NavigationProps {
    page: Page;
}

const Navigation = ({ page }: NavigationProps) => {
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    return (
        <StyledNavigation aria-label="Navigation">
            <Text
                color={colors.secondary}
                id="navigation-work"
                margin="0 0 0.5rem 0"
                toUpperCase
            >
                {languageData.sidebar.work}
            </Text>
            <NavList aria-labelledby="navigation-work" role="list">
                {Object.values(pages).map(({ name, path }) => {
                    const isActive = path === page.path;

                    return (
                        <NavElement key={name}>
                            <NavLink
                                aria-current={isActive ? "page" : undefined}
                                href={path}
                                $isActive={isActive}
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
                color={colors.secondary}
                id="navigation-links"
                margin="0.5rem 0"
                toUpperCase
            >
                {languageData.sidebar.links}
            </Text>
            <NavList aria-labelledby="navigation-links" role="list">
                {Object.values(links).map(({ name, path }) => (
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
