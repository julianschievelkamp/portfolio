import { pageData } from "data/pageData";
import {
    Label,
    NavElement,
    NavLink,
    NavList,
    StyledNavigation,
} from "./styles";
import { useStore } from "hooks/useStore";
import { lang } from "data/lang";
import Text from "elements/components/text";

const Navigation = () => {
    const { setSidebarOpen } = useStore();

    return (
        <StyledNavigation>
            <Label margin="0 0 0.5rem 0" fontSize="0.875rem">
                {lang.work}
            </Label>

            <NavList>
                {pageData.map(({ name, path }) => {
                    const isActive = true;

                    return (
                        <NavElement key={name}>
                            <NavLink
                                $isActive={isActive}
                                href={`#${path}`}
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
