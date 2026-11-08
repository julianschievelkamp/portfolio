import Text from "elements/components/Text/Text";
import {
    ArtistSection,
    ArtistWrapper,
    PortraitCaption,
    PortraitFigure,
} from "./Artist.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Div from "elements/components/Div/Div";
import Social from "./Social/Social";
import Headline from "elements/components/Headline/Headline";

const Artist = () => {
    const artistData = languageData.about.artist;

    return (
        <ArtistSection>
            <Headline type="h2" visuallyHidden>
                {artistData.headline}
            </Headline>
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
