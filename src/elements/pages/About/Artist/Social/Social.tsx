import Text from "elements/components/Text/Text";
import {
    StyledSocial,
    ProfileImage,
    SocialText,
    StyledProfile,
} from "./Social.styles";
import Image from "elements/components/Image/Image";
import Link from "elements/components/Link/Link";
import { colors } from "styles/variables";
import { languageData } from "data/languageData";

const Social = () => {
    const socialData = languageData.about.artist.social;

    return (
        <StyledSocial onClick={() => window.open(socialData.link)}>
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

            <SocialText>
                <Text fontSize="0.875rem" bold>
                    <Link href={socialData.link} target="_blank">
                        {socialData.profile}
                    </Link>
                </Text>
                <Text fontSize="0.875rem" color={colors.secondary}>
                    {socialData.name}
                </Text>
            </SocialText>
        </StyledSocial>
    );
};

export default Social;
