import { pageData } from "data/pageData";
import { Label, NavElement, StyledNavigation } from "./styles";
import { useStore } from "hooks/useStore";
import { lang } from "data/lang";
import Text from "elements/components/text";

const Navigation = () => {
    const { currentPageIndex, setCurrentPageIndex, setSidebarOpen } =
        useStore();

    return (
        <StyledNavigation>
            <Label margin="0 0 0.5rem 0" fontSize="0.875rem">
                {lang.work}
            </Label>

            {pageData.map(({ name }, index) => {
                const isActive = index === currentPageIndex;

                return (
                    <NavElement
                        $isActive={isActive}
                        key={name}
                        onClick={() => {
                            if (isActive) return;

                            setCurrentPageIndex(index);
                            setSidebarOpen(false);
                        }}
                    >
                        <Text
                            bold={isActive}
                            color={isActive ? "black" : undefined}
                        >
                            {name}
                        </Text>
                    </NavElement>
                );
            })}
        </StyledNavigation>
    );
};

export default Navigation;
