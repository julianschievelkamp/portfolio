import React from "react";

import { StyledList, ListItem } from "./styles";
import Text from "../text";

export interface ListProps {
    items: React.ReactNode[];
    margin?: string;
}

const List = ({ items, margin = "0" }: ListProps) => {
    return (
        <StyledList $margin={margin}>
            {items.map((item, index) => {
                return (
                    <ListItem key={index}>
                        <Text fontSize="0.875rem">{item}</Text>
                    </ListItem>
                );
            })}
        </StyledList>
    );
};

export default List;
