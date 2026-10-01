import { BadgesWrapper } from "../styles";
import { languageData } from "data/languageData";
import Image from "elements/components/image";
import Divider from "elements/components/divider";
import { badges } from "data/portfolioData";
import Link from "elements/components/link";

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
