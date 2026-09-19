import { BadgesWrapper } from "../styles";
import { lang } from "data/lang";
import Image from "elements/components/image";
import Divider from "elements/components/divider";
import Div from "elements/components/div";

const Badges = () => {
    return (
        <>
            <Divider>{lang.badges.headline}</Divider>
            <BadgesWrapper>
                {lang.badges.items.map((badge) => {
                    return (
                        <Div
                            key={badge.alt}
                            display="flex"
                            justifyContent="center"
                        >
                            <Image
                                src={badge.image}
                                alt={badge.alt}
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
