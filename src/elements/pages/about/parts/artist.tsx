import Text from "elements/components/text";
import { ArtistWrapper, ImageWrapper } from "../styles";
import { lang } from "data/lang";
import Image from "elements/components/image";

import SelfPortrait from "assets/img/misc/self_portrait.jpg";

const Artist = () => {
    return (
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
    );
};

export default Artist;
