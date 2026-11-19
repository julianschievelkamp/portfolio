import { Fragment } from "react";
import Text from "elements/components/Text/Text";
import { ListWrapper, ReferencesWrapper } from "./References.styles";
import { languageData } from "data/languageData";
import List from "elements/components/List/List";
import Headline from "elements/components/Headline/Headline";
import { Div, Section } from "styles/variables";

const References = () => {
    const referencesData = languageData.about.references;

    return (
        <Section>
            <Headline type="h2">{referencesData.headline}</Headline>
            <ReferencesWrapper>
                {referencesData.sections.map(({ title, subTitle, lists }) => (
                    <Fragment key={title}>
                        <Div>
                            <Text bold>{title}</Text>
                            <Text>{subTitle}</Text>
                        </Div>
                        <ListWrapper>
                            {lists.map((items, index) => (
                                <List
                                    key={index}
                                    items={items}
                                    margin={
                                        index < lists.length - 1
                                            ? "0 0 1rem 0"
                                            : undefined
                                    }
                                />
                            ))}
                        </ListWrapper>
                    </Fragment>
                ))}
            </ReferencesWrapper>
        </Section>
    );
};

export default References;
