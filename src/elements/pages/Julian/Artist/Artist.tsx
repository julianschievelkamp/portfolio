import Text from "elements/components/Text/Text";
import {
    ArtistSection,
    ArtistWrapper,
    PortraitCaption,
    PortraitFigure,
    StyledDivider,
} from "./Artist.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Div from "elements/components/Div/Div";
import Social from "./Social/Social";

const Artist = () => {
    const artistData = languageData.julian.artist;

    return (
        <ArtistSection>
            <StyledDivider>{artistData.headline}</StyledDivider>
            <ArtistWrapper>
                <PortraitFigure>
                    <Image
                        src={artistData.image.src}
                        alt={artistData.image.alt}
                        height="100%"
                        fadeInOnLoad
                    />
                    <PortraitCaption>
                        {artistData.image.caption}
                    </PortraitCaption>
                </PortraitFigure>
                <Div>
                    <Text fontSize="0.875rem" textAlign="justify">
                        {artistData.text}
                    </Text>

                    <Social />
                </Div>
            </ArtistWrapper>
        </ArtistSection>
    );
};

export default Artist;
