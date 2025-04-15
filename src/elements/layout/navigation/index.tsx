import { Page, pageData } from "data/pageData";
import {
    Label,
    NavElement,
    NavLink,
    NavList,
    StyledNavigation,
} from "./styles";
import { lang } from "data/lang";
import Text from "elements/components/text";
import { useStore } from "hooks/useStore";

export interface NavigationProps {
    page: Page;
}

const Navigation = ({ page }: NavigationProps) => {
    const { setSidebarOpen } = useStore();

    return (
        <StyledNavigation>
            <Label margin="0 0 0.5rem 0" fontSize="0.875rem">
                {lang.work}
            </Label>

            <NavList>
                {Object.keys(pageData).map((key) => {
                    const { path, name } = pageData[key];
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
        </StyledNavigation>
    );
};

export default Navigation;
