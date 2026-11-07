import { BadgesWrapper } from "./Badges.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Divider from "elements/components/Divider/Divider";
import { badges } from "data/portfolioData";
import Link from "elements/components/Link/Link";

const Badges = () => {
    return (
        <>
            <Divider>{languageData.badges.headline}</Divider>
            <BadgesWrapper>
                {Object.keys(badges).map((key) => {
                    const badge = badges[key as keyof typeof badges];

                    return (
                        <Link key={key} href={badge.link} target="_blank">
                            <Image
                                src={badge.image}
                                alt={badge.alt}
                                loading="lazy"
                                aspectRatio="1/1"
                                width="100%"
                                height="100%"
                                fadeInOnLoad
                            />
                        </Link>
                    );
                })}
            </BadgesWrapper>
        </>
    );
};

export default Badges;
