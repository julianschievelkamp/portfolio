import Text from "elements/components/Text/Text";
import {
    ArtistWrapper,
    PortraitCaption,
    PortraitFigure,
} from "./Artist.styles";
import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Social from "./Social/Social";
import Headline from "elements/components/Headline/Headline";
import { Div, Section } from "styles/variables";

const Artist = () => {
    const artistData = languageData.about.artist;

    return (
        <Section>
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
        </Section>
    );
};

export default Artist;
