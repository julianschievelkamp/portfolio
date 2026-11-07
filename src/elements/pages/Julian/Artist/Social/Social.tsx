import Text from "elements/components/Text/Text";
import { StyledSocial, ProfileImage, StyledProfile } from "./Social.styles";
import Image from "elements/components/Image/Image";
import Div from "elements/components/Div/Div";
import Link from "elements/components/Link/Link";
import { colors } from "styles/variables";
import { languageData } from "data/languageData";

const Social = () => {
    return (
        <StyledSocial
            display="flex"
            margin="2rem 0 0 0"
            alignItems="center"
            width="fit-content"
            onClick={() => window.open(languageData.social.link)}
        >
            <StyledProfile>
                <ProfileImage>
                    <Image
                        src={languageData.social.image}
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
                    <Link href={languageData.social.link} target="_blank">
                        {languageData.social.profile}
                    </Link>
                </Text>
                <Text fontSize="0.875rem" color={colors.secondary}>
                    {languageData.social.name}
                </Text>
            </Div>
        </StyledSocial>
    );
};

export default Social;
