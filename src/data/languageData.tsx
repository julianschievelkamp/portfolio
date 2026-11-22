import Badge1 from "assets/img/misc/badge1.png";
import Badge2 from "assets/img/misc/badge2.jpg";
import Badge3 from "assets/img/misc/badge3.png";
import Profile from "assets/img/misc/profile.jpg";
import SelfPortrait from "assets/img/misc/self_portrait.jpg";
import Link from "elements/components/Link/Link";

export const languageData = {
    title: (
        <>
            Julian
            <br />
            Schievelkamp
            <br />
            CGN #1994
        </>
    ),
    sidebar: {
        intro: "Visual artist and fine art photographer highlighting the synergies of classic photography and CGI.",
        work: "Work",
        links: "Links",
        footer: (
            <>
                © Julian Schievelkamp
                <br />
                All rights reserved.
            </>
        ),
    },
    portfolio: {
        headline: "Portfolio",
    },
    about: {
        artist: {
            headline: "About the Artist",
            image: {
                src: SelfPortrait,
                alt: "Black and white portrait of Julian Schievelkamp in a denim jacket, sitting on a wooden chair floating among clouds and mist.",
                caption: "Self-portrait of Julian Schievelkamp",
            },
            text: [
                <>
                    Julian Schievelkamp (b. 1994) is a contemporary visual
                    artist and fine art photographer based in Cologne, Germany.
                    Using both analog film and digital techniques, his recent
                    work emphasizes the synergies of classic photography and
                    computer-generated imagery. Synaesthetic and psychedelic
                    experiences, where sensory impressions merge into a single
                    picture, have had a great influence on his way of working.
                </>,
                <>
                    Schievelkamp has won several prizes and awards, including
                    the 2017 Prix de la Photographie Paris. In 2019 the artist
                    was awarded the title{" "}
                    <i>Fine Art Photographer of the Year</i> by the jury of the
                    5th Fine Art Photography Awards. He has exhibited his work
                    in London, Berlin and Cologne and over 100 YellowKorner
                    galleries worldwide.
                </>,
                <>
                    High-quality fine art prints in various formats and sizes
                    are available upon request. For collaborations, commissions,
                    or inquiries, feel free to reach out via{" "}
                    <Link
                        href="mailto:mail@julianschievelkamp.com"
                        target="_blank"
                    >
                        email
                    </Link>{" "}
                    or social media.
                </>,
            ],
            social: {
                image: Profile,
                link: "https://www.instagram.com/julianschievelkamp/",
                name: "Julian Schievelkamp",
                profile: "@julianschievelkamp",
            },
        },
        references: {
            headline: "Selected References",
            sections: [
                {
                    title: (
                        <>
                            <b>Publications</b>
                            <br />
                            2015—present
                        </>
                    ),
                    lists: [
                        [
                            <>
                                Foundation
                                <br />
                                <span>NFT Auctions</span>
                            </>,
                            <>
                                Singulart
                                <br />
                                <span>Limited Edition Prints</span>
                            </>,
                            <>YellowKorner Galleries</>,
                            <>
                                <Link
                                    href="https://www.vogue.com/photovogue/photographers/71498"
                                    target="_blank"
                                >
                                    PhotoVogue
                                </Link>
                            </>,
                            <>
                                Art + Commerce
                                <br />
                                <span>PhotoVogue Collection</span>
                            </>,
                        ],
                        [
                            <>Marie Claire Maison 11/17</>,
                            <>
                                <Link
                                    href="https://www.worldphoto.org/blogs/15-03-17/human-transformation-beauty-and-darkness-julian-schievelkamp-2017-swpa"
                                    target="_blank"
                                >
                                    Interview by Matthew Oxley
                                </Link>
                                <br />
                                <span>World Photography Organisation</span>
                            </>,
                            <>
                                <Link
                                    href="https://www.szerokikadr.pl/inspiracje/julian-schievelkamp"
                                    target="_blank"
                                >
                                    Inspiracje: Julian Schievelkamp
                                </Link>
                                <br />
                                <span>Szeroki Kadr by Nikon (polish)</span>
                            </>,
                        ],
                        [
                            <>
                                SWPA exhibition 2016 & 2017
                                <br />
                                <span>Somerset House, London</span>
                            </>,
                            <>
                                photokina 09/2016
                                <br />
                                <span>Koelnmesse, Cologne</span>
                            </>,
                            <>
                                UPdate 2017
                                <br />
                                <span>Titanic Hotel, Berlin</span>
                            </>,
                        ],
                    ],
                },
                {
                    title: (
                        <>
                            <b>Awards</b>
                            <br />
                            2015—present
                        </>
                    ),
                    lists: [
                        [
                            <>
                                ProfiFoto Scholarship
                                <br />
                                <span>Fotoakademie-Koeln</span>
                            </>,
                            <>Canon Sponsoring Award</>,
                            <>PIC Förderpreis Selected 2018</>,
                        ],
                        [
                            <>
                                Fine Art Photography Awards
                                <br />
                                <span>2019: Grand Prize Winner</span>
                                <br />
                                <span>2016: Nominee "Fine Art"</span>
                            </>,
                            <>
                                ND Awards
                                <br />
                                <span>2019: 1st Place (Gold) "Open Theme"</span>
                            </>,
                            <>
                                Prix de la Photographie Paris
                                <br />
                                <span>2019: Honorable Mention "Fine Art"</span>
                                <br />
                                <span>
                                    2017: 1st Place (Gold) "Self-Portrait"
                                </span>
                            </>,
                            <>
                                Sony World Photography Awards
                                <br />
                                <span>2017: Shortlist "Enhanced"</span>
                                <br />
                                <span>2016: Commended "Enhanced"</span>
                            </>,
                            <>
                                GoSee Awards
                                <br />
                                <span>2017: Silver, Best Portfolio</span>
                            </>,
                            <>
                                International Photo Awards
                                <br />
                                <span>2016: Honorable Mention "Portrait"</span>
                                <br />
                                <span>2016: Honorable Mention "Other"</span>
                            </>,
                        ],
                    ],
                },
            ],
        },
        badges: {
            headline: "First Prize Winner",
            items: {
                fapa: {
                    image: Badge1,
                    alt: "Fine Art Photography Awards",
                    link: "https://fineartphotoawards.com/winners-gallery/fapa-2018-2019/amateur/grand-prize",
                },
                px3: {
                    image: Badge2,
                    alt: "Prix de la Photographie Paris",
                    link: "https://px3.fr/winners/px3/2017/",
                },
                nd: {
                    image: Badge3,
                    alt: "ND Awards",
                    link: "https://ndawards.net/winners-gallery/nd-awards-2019/non-professional/open-theme/735/gold-award/",
                },
            },
        },
    },
    impressum: [
        <>
            <b>Angaben gemäß § 5 TMG:</b>
        </>,
        <>
            Julian Schievelkamp
            <br />
            Zollstocksweg 1
            <br />
            50969 Köln
        </>,
        <>
            <Link href="tel:+4915679602835">+49 156 796 028 35</Link>
            <br />
            <Link href="mailto:mail@julianschievelkamp.com" target="_blank">
                mail@julianschievelkamp.com
            </Link>
        </>,
    ],
};
