import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Link from "elements/components/Link/Link";
import Text from "elements/components/Text/Text";
import { colors } from "styles/variables";

import { ImageLink, ImageWrapper, StyledSocial } from "./Social.styles";

const { image, link, name, profile } = languageData.about.artist.social;

const Social = () => (
    <StyledSocial>
        <ImageLink href={link} tabIndex={-1} target="_blank">
            <ImageWrapper>
                <Image
                    alt={image.alt}
                    aspectRatio={image.aspectRatio}
                    fadeInOnLoad
                    height="100%"
                    src={image.src}
                    width="100%"
                />
            </ImageWrapper>
        </ImageLink>

        <div>
            <Text bold>
                <Link href={link} target="_blank">
                    {profile}
                </Link>
            </Text>
            <Text color={colors.secondary}>{name}</Text>
        </div>
    </StyledSocial>
);

export default Social;
