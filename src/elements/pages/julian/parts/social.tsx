import Text from "elements/components/text";
import { StyledSocial, ProfileImage, StyledProfile } from "../styles";
import Image from "elements/components/image";
import Div from "elements/components/div";

import Profile from "assets/img/misc/profile.jpg";
import Link from "elements/components/link";
import { colors } from "styles/variables";

const Social = () => {
    return (
        <StyledSocial
            display="flex"
            margin="2rem 0 0 0"
            alignItems="center"
            width="fit-content"
            onClick={() =>
                window.open("https://www.instagram.com/julianschievelkamp/")
            }
        >
            <StyledProfile>
                <ProfileImage>
                    <Image src={Profile} alt="Instagram Profile" fadeInOnLoad />
                </ProfileImage>
            </StyledProfile>

            <Div margin="0 1rem 0 0.5rem">
                <Text fontSize="0.875rem" bold>
                    <Link
                        href="https://www.instagram.com/julianschievelkamp/"
                        target="_blank"
                    >
                        @julianschievelkamp
                    </Link>
                </Text>
                <Text fontSize="0.875rem" color={colors.secondary}>
                    Julian Schievelkamp
                </Text>
            </Div>
        </StyledSocial>
    );
};

export default Social;
