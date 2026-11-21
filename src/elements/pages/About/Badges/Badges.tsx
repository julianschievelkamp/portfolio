import { languageData } from "data/languageData";
import Headline from "elements/components/Headline/Headline";
import Image from "elements/components/Image/Image";

import { BadgesWrapper, StyledLink } from "./Badges.styles";

const { headline, items } = languageData.about.badges;

const Badges = () => (
    <section>
        <Headline type="h2">{headline}</Headline>
        <BadgesWrapper>
            {Object.keys(items).map((key) => {
                const badge = items[key as keyof typeof items];

                return (
                    <StyledLink key={key} href={badge.link} target="_blank">
                        <Image
                            alt={badge.alt}
                            aspectRatio="1/1"
                            fadeInOnLoad
                            height="100%"
                            loading="lazy"
                            src={badge.image}
                            width="100%"
                        />
                    </StyledLink>
                );
            })}
        </BadgesWrapper>
    </section>
);

export default Badges;
