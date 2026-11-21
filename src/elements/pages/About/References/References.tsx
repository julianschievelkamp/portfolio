import { Fragment } from "react";

import { languageData } from "data/languageData";
import Headline from "elements/components/Headline/Headline";
import List from "elements/components/List/List";
import Text from "elements/components/Text/Text";

import { ListWrapper, ReferencesWrapper } from "./References.styles";

const References = () => {
    const referencesData = languageData.about.references;

    return (
        <section>
            <Headline type="h2">{referencesData.headline}</Headline>
            <ReferencesWrapper>
                {referencesData.sections.map(({ lists, subTitle, title }) => (
                    <Fragment key={title}>
                        <div>
                            <Text bold>{title}</Text>
                            <Text>{subTitle}</Text>
                        </div>
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
        </section>
    );
};

export default References;
