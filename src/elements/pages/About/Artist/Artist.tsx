import { languageData } from "data/languageData";
import Headline from "elements/components/Headline/Headline";
import Image from "elements/components/Image/Image";
import Text from "elements/components/Text/Text";

import {
    ArtistWrapper,
    PortraitCaption,
    PortraitFigure,
} from "./Artist.styles";
import Social from "./Social/Social";

const Artist = () => {
    const artistData = languageData.about.artist;

    return (
        <section>
            <Headline type="h2" visuallyHidden>
                {artistData.headline}
            </Headline>
            <ArtistWrapper>
                <PortraitFigure>
                    <Image
                        alt={artistData.image.alt}
                        fadeInOnLoad
                        fetchPriority="high"
                        height="100%"
                        src={artistData.image.src}
                    />
                    <PortraitCaption>
                        {artistData.image.caption}
                    </PortraitCaption>
                </PortraitFigure>
                <div>
                    <Text textAlign="justify">{artistData.text}</Text>

                    <Social />
                </div>
            </ArtistWrapper>
        </section>
    );
};

export default Artist;
