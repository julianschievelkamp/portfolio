import Text from "elements/components/Text/Text";
import { StyledSocial, ImageLink, ImageWrapper } from "./Social.styles";
import Image from "elements/components/Image/Image";
import Link from "elements/components/Link/Link";
import { colors } from "styles/variables";
import { languageData } from "data/languageData";

const Social = () => {
    const socialData = languageData.about.artist.social;

    return (
        <StyledSocial>
            <ImageLink href={socialData.link} target="_blank" tabIndex={-1}>
                <ImageWrapper>
                    <Image
                        src={socialData.image}
                        alt="Instagram Profile"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        aspectRatio="1/1"
                        fadeInOnLoad
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
