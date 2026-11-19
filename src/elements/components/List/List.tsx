import type { ReactNode } from "react";

import { StyledList, ListItem } from "./List.styles";
import Text from "elements/components/Text/Text";

export interface ListProps {
    items: ReactNode[];
    margin?: string;
}

const List = ({ items, margin = "0" }: ListProps) => {
    return (
        <StyledList $margin={margin}>
            {items.map((item, index) => {
                return (
                    <ListItem key={index}>
                        <Text>{item}</Text>
                    </ListItem>
                );
            })}
        </StyledList>
    );
};

export default List;
