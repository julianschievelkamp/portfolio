import Text from "elements/components/text";
import { StyledSocial, ProfileImage, StyledProfile } from "../styles";
import Image from "elements/components/image";
import Div from "elements/components/div";

import Profile from "assets/img/misc/profile.jpg";
import Link from "elements/components/link";
import { colors } from "styles/variables";
import { lang } from "data/lang";

const Social = () => {
    return (
        <StyledSocial
            display="flex"
            margin="2rem 0 0 0"
            alignItems="center"
            width="fit-content"
            onClick={() => window.open(lang.social.link)}
        >
            <StyledProfile>
                <ProfileImage>
                    <Image
                        src={Profile}
                        alt="Instagram Profile"
                        aspectRatio="1/1"
                        width="100%"
                        height="100%"
                    />
                </ProfileImage>
            </StyledProfile>

            <Div margin="0 1rem 0 0.5rem">
                <Text fontSize="0.875rem" bold>
                    <Link href={lang.social.link} target="_blank">
                        {lang.social.profile}
                    </Link>
                </Text>
                <Text fontSize="0.875rem" color={colors.secondary}>
                    {lang.social.name}
                </Text>
            </Div>
        </StyledSocial>
    );
};

export default Social;
