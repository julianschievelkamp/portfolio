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
                        src={artistData.image.src}
                        alt={artistData.image.alt}
                        height="100%"
                        fetchPriority="high"
                        fadeInOnLoad
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
