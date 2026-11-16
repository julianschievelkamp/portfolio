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
                fontSize="0.875rem"
                toUpperCase
            >
                {languageData.work}
            </Text>
            <NavList role="list" aria-labelledby="navigation-work">
                {Object.keys(pages).map((key) => {
                    const { path, name } = pages[key];
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
                fontSize="0.875rem"
                toUpperCase
            >
                {languageData.links}
            </Text>
            <NavList role="list" aria-labelledby="navigation-links">
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

export default memo(Navigation);
