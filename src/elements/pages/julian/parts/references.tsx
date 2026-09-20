import Text from "elements/components/text";
import { ListWrapper, ReferencesWrapper } from "../styles";
import { languageData } from "data/languageData";
import Divider from "elements/components/divider";
import Div from "elements/components/div";
import List from "elements/components/list";

const References = () => {
    return (
        <>
            <Divider>{languageData.references.headline}</Divider>
            <ReferencesWrapper>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {languageData.references.publications.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {languageData.references.publications.subTitle}
                    </Text>
                </Div>
                <ListWrapper>
                    <List
                        items={
                            languageData.references.publications.listEntries1
                        }
                        margin="0 0 1rem 0"
                    />
                    <List
                        items={
                            languageData.references.publications.listEntries2
                        }
                        margin="0 0 1rem 0"
                    />
                    <List
                        items={
                            languageData.references.publications.listEntries3
                        }
                    />
                </ListWrapper>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {languageData.references.awards.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {languageData.references.awards.subTitle}
                    </Text>
                </Div>
                <ListWrapper>
                    <List
                        items={languageData.references.awards.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List items={languageData.references.awards.listEntries2} />
                </ListWrapper>
            </ReferencesWrapper>
        </>
    );
};

export default References;
