import Text from "elements/components/text";
import { ReferencesWrapper } from "../styles";
import { lang } from "data/lang";
import Divider from "elements/components/divider";
import Div from "elements/components/div";
import List from "elements/components/list";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";

const References = () => {
    const isSm = useMediaQuery(queries.sm);

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
                <Div padding={!isSm ? "0 0 0 1rem" : undefined}>
                    <List
                        items={lang.references.publications.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List
                        items={lang.references.publications.listEntries2}
                        margin="0 0 1rem 0"
                    />
                    <List items={lang.references.publications.listEntries3} />
                </Div>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {lang.references.awards.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {lang.references.awards.subTitle}
                    </Text>
                </Div>
                <Div padding={!isSm ? "0 0 0 1rem" : undefined}>
                    <List
                        items={lang.references.awards.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List items={lang.references.awards.listEntries2} />
                </Div>
            </ReferencesWrapper>
        </>
    );
};

export default References;
