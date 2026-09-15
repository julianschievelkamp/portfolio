import Text from "elements/components/text";
import {
    ArtistWrapper,
    ImageWrapper,
    SocialMedia,
    ProfileImage,
    StyledProfile,
} from "../styles";
import { lang } from "data/lang";
import Image from "elements/components/image";
import Div from "elements/components/div";

import SelfPortrait from "assets/img/misc/self_portrait.jpg";
import Profile from "assets/img/misc/profile.jpg";
import Link from "elements/components/link";

const Artist = () => {
    return (
        <ArtistWrapper>
            <ImageWrapper>
                <Image
                    src={SelfPortrait}
                    alt="Julian Schievelkamp"
                    fadeInOnLoad
                />
            </ImageWrapper>
            <Div>
                <Text fontSize="0.875rem" textAlign="justify">
                    {lang.julian}
                </Text>

                <SocialMedia
                    display="flex"
                    margin="2rem 0 0 0"
                    alignItems="center"
                    width="fit-content"
                    onClick={() =>
                        window.open(
                            "https://www.instagram.com/julianschievelkamp/",
                        )
                    }
                >
                    <StyledProfile>
                        <ProfileImage>
                            <Image src={Profile} alt="Instagram Profile" />
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
                        <Text fontSize="0.875rem">Julian Schievelkamp</Text>
                    </Div>
                </SocialMedia>
            </Div>
        </ArtistWrapper>
    );
};

export default Artist;
