import Text from "elements/components/Text/Text";
import {
    ListWrapper,
    ReferenceHeader,
    ReferencesSection,
    ReferencesWrapper,
} from "./References.styles";
import { languageData } from "data/languageData";
import List from "elements/components/List/List";
import Headline from "elements/components/Headline/Headline";

const References = () => {
    const referencesData = languageData.about.references;

    return (
        <ReferencesSection>
            <Headline type="h2">{referencesData.headline}</Headline>
            <ReferencesWrapper>
                <ReferenceHeader>
                    <Text fontSize="0.875rem" bold>
                        {referencesData.publications.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {referencesData.publications.subTitle}
                    </Text>
                </ReferenceHeader>
                <ListWrapper>
                    <List
                        items={referencesData.publications.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List
                        items={referencesData.publications.listEntries2}
                        margin="0 0 1rem 0"
                    />
                    <List items={referencesData.publications.listEntries3} />
                </ListWrapper>
                <ReferenceHeader>
                    <Text fontSize="0.875rem" bold>
                        {referencesData.awards.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {referencesData.awards.subTitle}
                    </Text>
                </ReferenceHeader>
                <ListWrapper>
                    <List
                        items={referencesData.awards.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List items={referencesData.awards.listEntries2} />
                </ListWrapper>
            </ReferencesWrapper>
        </ReferencesSection>
    );
};

export default References;
