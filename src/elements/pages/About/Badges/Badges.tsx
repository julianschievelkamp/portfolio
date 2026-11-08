import { BadgesSection, BadgesWrapper, StyledLink } from "./Badges.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import { badges } from "data/portfolioData";
import Headline from "elements/components/Headline/Headline";

const Badges = () => {
    const badgesData = languageData.about.badges;

    return (
        <BadgesSection>
            <Headline type="h2">{badgesData.headline}</Headline>
            <BadgesWrapper>
                {Object.keys(badges).map((key) => {
                    const badge = badges[key as keyof typeof badges];

                    return (
                        <StyledLink key={key} href={badge.link} target="_blank">
                            <Image
                                src={badge.image}
                                alt={badge.alt}
                                loading="lazy"
                                aspectRatio="1/1"
                                width="100%"
                                height="100%"
                                fadeInOnLoad
                            />
                        </StyledLink>
                    );
                })}
            </BadgesWrapper>
        </BadgesSection>
    );
};

export default Badges;
