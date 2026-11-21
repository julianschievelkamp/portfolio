import { languageData } from "data/languageData";
import Image from "elements/components/Image/Image";
import Link from "elements/components/Link/Link";
import Text from "elements/components/Text/Text";
import { colors } from "styles/variables";

import { ImageLink, ImageWrapper, StyledSocial } from "./Social.styles";

const Social = () => {
    const socialData = languageData.about.artist.social;

    return (
        <StyledSocial>
            <ImageLink href={socialData.link} tabIndex={-1} target="_blank">
                <ImageWrapper>
                    <Image
                        alt="Instagram Profile"
                        aspectRatio="1/1"
                        fadeInOnLoad
                        height="100%"
                        loading="lazy"
                        src={socialData.image}
                        width="100%"
                    />
                </ImageWrapper>
            </ImageLink>

            <div>
                <Text bold>
                    <Link href={socialData.link} target="_blank">
                        {socialData.profile}
                    </Link>
                </Text>
                <Text color={colors.secondary}>{socialData.name}</Text>
            </div>
        </StyledSocial>
    );
};

export default Social;
