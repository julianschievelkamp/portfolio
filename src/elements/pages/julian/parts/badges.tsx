import { BadgesWrapper } from "../styles";
import { lang } from "data/lang";
import Image from "elements/components/image";
import Divider from "elements/components/divider";
import Div from "elements/components/div";

import Badge1 from "assets/img/misc/badge1.png";
import Badge2 from "assets/img/misc/badge2.jpg";
import Badge3 from "assets/img/misc/badge3.png";

const badges = [
    { image: Badge1, alt: "Fine Art Photography Awards" },
    { image: Badge2, alt: "Prix de la Photographie Paris" },
    { image: Badge3, alt: "ND Awards" },
];

const Badges = () => {
    return (
        <>
            <Divider>{lang.badges.headline}</Divider>
            <BadgesWrapper>
                {badges.map((badge) => {
                    return (
                        <Div
                            key={badge.alt}
                            display="flex"
                            justifyContent="center"
                        >
                            <Image
                                src={badge.image}
                                alt={badge.alt}
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
