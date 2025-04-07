import { pageData } from "data/pageData";
import { Label, NavElement, StyledNavigation, StyledText } from "./styles";
import { useStore } from "hooks/useStore";
import { lang } from "data/lang";

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
                        key={name}
                        onClick={() => {
                            if (isActive) return;

                            setCurrentPageIndex(index);
                            setSidebarOpen(false);
                        }}
                    >
                        <StyledText
                            $isActive={isActive}
                            bold={isActive}
                            color={isActive ? "black" : undefined}
                        >
                            {name}
                        </StyledText>
                    </NavElement>
                );
            })}
        </StyledNavigation>
    );
};

export default Navigation;
