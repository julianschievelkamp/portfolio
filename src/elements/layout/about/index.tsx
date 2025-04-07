import Text from "elements/components/text";
import {
    ArtistWrapper,
    BadgeWrapper,
    ImageWrapper,
    StyledAbout,
} from "./styles";
import { lang } from "data/lang";
import Image from "elements/components/image";
import Div from "elements/components/div";

import SelfPortrait from "assets/img/misc/self_portrait.jpg";
import Badge1 from "assets/img/misc/badge1.png";
import Badge2 from "assets/img/misc/badge2.jpg";
import Badge3 from "assets/img/misc/badge3.png";
import Divider from "elements/components/divider";

const badges = [
    { image: Badge1, alt: "Fine Art Photography Awards" },
    { image: Badge2, alt: "PX3" },
    { image: Badge3, alt: "ND Awards" },
];

const About = () => {
    return (
        <StyledAbout>
            <ArtistWrapper>
                <ImageWrapper>
                    <Image
                        src={SelfPortrait}
                        alt="Julian Schievelkamp"
                        fadeInOnLoad
                    />
                </ImageWrapper>
                <Text fontSize="0.875rem" textAlign="justify">
                    {lang.about}
                </Text>
            </ArtistWrapper>
            <Divider>{lang.referencesHeadline}</Divider>

            <Divider>{lang.badgesHeadline}</Divider>
            <BadgeWrapper>
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
            </BadgeWrapper>
        </StyledAbout>
    );
};

export default About;
