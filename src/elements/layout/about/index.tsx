import Text from "elements/components/text";
import { ArtistWrapper, ImageWrapper, StyledAbout } from "./styles";
import { lang } from "data/lang";
import Image from "elements/components/image";

import SelfPortrait from "assets/img/self_portrait.jpg";

export interface AboutProps {}

const About = ({}: AboutProps) => {
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
        </StyledAbout>
    );
};

export default About;
