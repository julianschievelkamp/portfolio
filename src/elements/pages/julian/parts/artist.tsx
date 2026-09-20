import Text from "elements/components/text";
import { ArtistWrapper, ImageWrapper } from "../styles";
import { languageData } from "data/languageData";
import Image from "elements/components/image";
import Div from "elements/components/div";

import SelfPortrait from "assets/img/misc/self_portrait.jpg";
import Social from "./social";

const Artist = () => {
    return (
        <ArtistWrapper>
            <ImageWrapper>
                <Image
                    src={SelfPortrait}
                    alt="Julian Schievelkamp"
                    loading="eager"
                    fadeInOnLoad
                />
            </ImageWrapper>
            <Div>
                <Text fontSize="0.875rem" textAlign="justify">
                    {languageData.julian}
                </Text>

                <Social />
            </Div>
        </ArtistWrapper>
    );
};

export default Artist;
