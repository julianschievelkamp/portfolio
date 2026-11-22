import { languageData } from "data/languageData";
import Headline from "elements/components/Headline/Headline";
import Image from "elements/components/Image/Image";
import Text from "elements/components/Text/Text";

import {
    ArtistWrapper,
    PortraitCaption,
    PortraitFigure,
    TextWrapper,
} from "./Artist.styles";
import Social from "./Social/Social";

const { headline, image, text } = languageData.about.artist;

const Artist = () => (
    <section>
        <Headline type="h2" visuallyHidden>
            {headline}
        </Headline>
        <ArtistWrapper>
            <PortraitFigure>
                <Image
                    alt={image.alt}
                    fadeInOnLoad
                    fetchPriority="high"
                    height="100%"
                    src={image.src}
                />
                <PortraitCaption>{image.caption}</PortraitCaption>
            </PortraitFigure>
            <TextWrapper>
                {text.map((paragraph, index) => (
                    <Text key={index} margin="0 0 1rem 0">
                        {paragraph}
                    </Text>
                ))}

                <Social />
            </TextWrapper>
        </ArtistWrapper>
    </section>
);

export default Artist;
