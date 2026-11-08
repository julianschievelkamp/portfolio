import Text from "elements/components/Text/Text";
import { StyledSocial, ProfileImage, StyledProfile } from "./Social.styles";
import Image from "elements/components/Image/Image";
import Div from "elements/components/Div/Div";
import Link from "elements/components/Link/Link";
import { colors } from "styles/variables";
import { languageData } from "data/languageData";

const Social = () => {
    const socialData = languageData.about.artist.social;

    return (
        <StyledSocial
            display="flex"
            margin="2rem 0 0 0"
            alignItems="center"
            width="fit-content"
            onClick={() => window.open(socialData.link)}
        >
            <StyledProfile>
                <ProfileImage>
                    <Image
                        src={socialData.image}
                        alt="Instagram Profile"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        aspectRatio="1/1"
                    />
                </ProfileImage>
            </StyledProfile>

            <Div margin="0 1rem 0 0.5rem">
                <Text fontSize="0.875rem" bold>
                    <Link href={socialData.link} target="_blank">
                        {socialData.profile}
                    </Link>
                </Text>
                <Text fontSize="0.875rem" color={colors.secondary}>
                    {socialData.name}
                </Text>
            </Div>
        </StyledSocial>
    );
};

export default Social;
