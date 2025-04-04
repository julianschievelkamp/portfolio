import { pageData } from "data/pageData";
import { NavElement, StyledNavigation, StyledText } from "./styles";

export interface NavigationProps {
    currentPageIndex: number;
    setCurrentPageIndex: (index: number) => void;
}

const Navigation = ({
    currentPageIndex,
    setCurrentPageIndex,
}: NavigationProps) => {
    return (
        <StyledNavigation>
            {pageData.map(({ name }, index) => {
                const isActive = index === currentPageIndex;

                return (
                    <NavElement onClick={() => setCurrentPageIndex(index)}>
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
