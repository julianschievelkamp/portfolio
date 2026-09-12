import Text from "elements/components/text";
import { ListWrapper, ReferencesWrapper } from "../styles";
import { lang } from "data/lang";
import Divider from "elements/components/divider";
import Div from "elements/components/div";
import List from "elements/components/list";

const References = () => {
    return (
        <>
            <Divider>{lang.references.headline}</Divider>
            <ReferencesWrapper>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {lang.references.publications.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {lang.references.publications.subTitle}
                    </Text>
                </Div>
                <ListWrapper>
                    <List
                        items={lang.references.publications.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List
                        items={lang.references.publications.listEntries2}
                        margin="0 0 1rem 0"
                    />
                    <List items={lang.references.publications.listEntries3} />
                </ListWrapper>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {lang.references.awards.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {lang.references.awards.subTitle}
                    </Text>
                </Div>
                <ListWrapper>
                    <List
                        items={lang.references.awards.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List items={lang.references.awards.listEntries2} />
                </ListWrapper>
            </ReferencesWrapper>
        </>
    );
};

export default References;
