import Text from "elements/components/Text/Text";
import { ArtistWrapper, ImageWrapper } from "./Artist.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Div from "elements/components/Div/Div";
import Social from "./Social/Social";

const Artist = () => {
    const artistData = languageData.julian.artist;

    return (
        <ArtistWrapper>
            <ImageWrapper>
                <Image
                    src={artistData.image}
                    alt="Julian Schievelkamp"
                    height="100%"
                    fadeInOnLoad
                />
            </ImageWrapper>
            <Div>
                <Text fontSize="0.875rem" textAlign="justify">
                    {artistData.text}
                </Text>

                <Social />
            </Div>
        </ArtistWrapper>
    );
};

export default Artist;
