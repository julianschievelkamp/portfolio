import type { ReactNode } from "react";

import Text from "elements/components/Text/Text";

import { ListItem, StyledList } from "./List.styles";

interface ListProps {
    items: ReactNode[];
    margin?: string;
}

const List = ({ items, margin = "0" }: ListProps) => (
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

export default List;
