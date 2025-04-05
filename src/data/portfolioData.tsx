import { PortfolioItem } from "./types";

import DadaYaga from "assets/img/dada_yaga.jpg";
import Andromeda from "assets/img/andromeda.jpg";
import Versus1 from "assets/img/versus_1.jpg";
import Versus2 from "assets/img/versus_2.jpg";
import Viscosity from "assets/img/viscosity.jpg";
import Aura from "assets/img/aura.jpg";
import Mimikry from "assets/img/mimikry.jpg";
import ACuriousThing from "assets/img/a_curious_thing.jpg";
import Doppler from "assets/img/doppler.jpg";
import Romina from "assets/img/romina.jpg";
import DNA1 from "assets/img/dna_1.jpg";
import DNA2 from "assets/img/dna_2.jpg";

import AndromedaVideo from "assets/videos/andromeda.mp4";

export const portfolioData: PortfolioItem[] = [
    {
        title: "DADA YAGA, 2018",
        image: DadaYaga,
    },
    {
        title: "ANDROMEDA, 2018",
        image: Andromeda,
        video: AndromedaVideo,
    },
    {
        title: "VERSUS I, 2018",
        image: Versus1,
    },
    {
        title: "VERSUS II, 2018",
        image: Versus2,
    },
    {
        title: "VISCOSITY, 2021",
        image: Viscosity,
    },
    {
        title: "AURA, 2019",
        image: Aura,
    },
    {
        title: "MIMIKRY, 2018",
        image: Mimikry,
    },
    {
        title: "A CURIOUS THING, 2017",
        image: ACuriousThing,
    },
    {
        title: "DOPPLER I, 2021",
        image: Doppler,
    },
    {
        title: "ROMINA, 2016",
        image: Romina,
    },
    {
        title: "DNA (XY) I, 2017",
        image: DNA1,
    },
    {
        title: "DNA (XY) II, 2017",
        image: DNA2,
    },
];
