import { pageData } from "data/pageData";
import { NavElement, StyledNavigation, StyledText } from "./styles";
import { useStore } from "hooks/useStore";

const Navigation = () => {
    const { currentPageIndex, setCurrentPageIndex } = useStore();

    return (
        <StyledNavigation>
            {pageData.map(({ name }, index) => {
                const isActive = index === currentPageIndex;

                return (
                    <NavElement
                        key={name}
                        onClick={() => setCurrentPageIndex(index)}
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
