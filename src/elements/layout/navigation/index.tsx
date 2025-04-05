import { pageData } from "data/pageData";
import { NavElement, StyledNavigation, StyledText } from "./styles";
import { useStore } from "hooks/useStore";
import Text from "elements/components/text";

const Navigation = () => {
    const { currentPageIndex, setCurrentPageIndex } = useStore();

    return (
        <StyledNavigation>
            <Text margin="0 0 0.5rem 0" fontSize="0.875rem" color="#999999">
                WORK
            </Text>
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
