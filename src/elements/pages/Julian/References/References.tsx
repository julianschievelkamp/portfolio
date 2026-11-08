import Text from "elements/components/Text/Text";
import { ListWrapper, ReferencesWrapper } from "./References.styles";
import { languageData } from "data/languageData";
import Divider from "elements/components/Divider/Divider";
import Div from "elements/components/Div/Div";
import List from "elements/components/List/List";

const References = () => {
    const referencesData = languageData.julian.references;

    return (
        <>
            <Divider>{referencesData.headline}</Divider>
            <ReferencesWrapper>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {referencesData.publications.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {referencesData.publications.subTitle}
                    </Text>
                </Div>
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
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {referencesData.awards.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {referencesData.awards.subTitle}
                    </Text>
                </Div>
                <ListWrapper>
                    <List
                        items={referencesData.awards.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List items={referencesData.awards.listEntries2} />
                </ListWrapper>
            </ReferencesWrapper>
        </>
    );
};

export default References;
