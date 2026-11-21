import { languageData } from "data/languageData";
import Headline from "elements/components/Headline/Headline";
import Image from "elements/components/Image/Image";

import { BadgesWrapper, StyledLink } from "./Badges.styles";

const Badges = () => {
    const badgesData = languageData.about.badges;

    return (
        <section>
            <Headline type="h2">{badgesData.headline}</Headline>
            <BadgesWrapper>
                {Object.keys(badgesData.items).map((key) => {
                    const badge =
                        badgesData.items[key as keyof typeof badgesData.items];

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
};

export default Badges;
