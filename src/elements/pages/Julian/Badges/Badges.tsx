import { BadgesSection, BadgesWrapper, StyledLink } from "./Badges.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Divider from "elements/components/Divider/Divider";
import { badges } from "data/portfolioData";

const Badges = () => {
    const badgesData = languageData.julian.badges;

    return (
        <BadgesSection>
            <Divider>{badgesData.headline}</Divider>
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
