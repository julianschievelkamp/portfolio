import { BadgesWrapper } from "../styles";
import { badges, languageData } from "data/languageData";
import Image from "elements/components/image";
import Divider from "elements/components/divider";
import Div from "elements/components/div";

const Badges = () => {
    return (
        <>
            <Divider>{languageData.badges.headline}</Divider>
            <BadgesWrapper>
                {Object.keys(badges).map((key) => {
                    const badge = badges[key as keyof typeof badges];

                    return (
                        <Div
                            key={key}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Image
                                src={badge.image}
                                alt={badge.alt}
                                loading="lazy"
                                aspectRatio="1/1"
                                width="100%"
                                height="100%"
                                fadeInOnLoad
                            />
                        </Div>
                    );
                })}
            </BadgesWrapper>
        </>
    );
};

export default Badges;
