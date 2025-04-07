import Text from "elements/components/text";
import {
    ArtistWrapper,
    BadgeWrapper,
    ImageWrapper,
    ReferencesWrapper,
    StyledAbout,
} from "./styles";
import { lang } from "data/lang";
import Image from "elements/components/image";
import Div from "elements/components/div";

import SelfPortrait from "assets/img/misc/self_portrait.jpg";
import Badge1 from "assets/img/misc/badge1.png";
import Badge2 from "assets/img/misc/badge2.jpg";
import Badge3 from "assets/img/misc/badge3.png";
import Divider from "elements/components/divider";
import List from "elements/components/list";

const badges = [
    { image: Badge1, alt: "Fine Art Photography Awards" },
    { image: Badge2, alt: "Prix de la Photographie Paris" },
    { image: Badge3, alt: "ND Awards" },
];

const About = () => {
    return (
        <StyledAbout>
            <ArtistWrapper>
                <ImageWrapper>
                    <Image
                        src={SelfPortrait}
                        alt="Julian Schievelkamp"
                        fadeInOnLoad
                    />
                </ImageWrapper>
                <Text fontSize="0.875rem" textAlign="justify">
                    {lang.about}
                </Text>
            </ArtistWrapper>

            <Divider>{lang.references.headline}</Divider>
            <ReferencesWrapper>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {lang.references.publications.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {lang.references.publications.subTitle}
                    </Text>
                </Div>
                <Div>
                    <List
                        items={lang.references.publications.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List
                        items={lang.references.publications.listEntries2}
                        margin="0 0 1rem 0"
                    />
                    <List items={lang.references.publications.listEntries3} />
                </Div>
                <Div>
                    <Text fontSize="0.875rem" bold>
                        {lang.references.awards.title}
                    </Text>
                    <Text fontSize="0.875rem">
                        {lang.references.awards.subTitle}
                    </Text>
                </Div>
                <Div>
                    <List
                        items={lang.references.awards.listEntries1}
                        margin="0 0 1rem 0"
                    />
                    <List items={lang.references.awards.listEntries2} />
                </Div>
            </ReferencesWrapper>

            <Divider>{lang.badges.headline}</Divider>
            <BadgeWrapper>
                {badges.map((badge) => {
                    return (
                        <Div
                            key={badge.alt}
                            display="flex"
                            justifyContent="center"
                        >
                            <Image
                                src={badge.image}
                                alt={badge.alt}
                                fadeInOnLoad
                            />
                        </Div>
                    );
                })}
            </BadgeWrapper>
        </StyledAbout>
    );
};

export default About;
