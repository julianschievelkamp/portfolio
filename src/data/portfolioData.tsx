import DadaYaga from "assets/img/dada_yaga.jpg";
import Andromeda from "assets/img/andromeda.jpg";
import Versus1 from "assets/img/versus_1.jpg";
import Versus2 from "assets/img/versus_2.jpg";
import Viscosity from "assets/img/viscosity.jpg";
import Aura from "assets/img/aura.jpg";
import Mimikry from "assets/img/mimikry.jpg";
import ACuriousThing from "assets/img/a_curious_thing.jpg";
import Doppler from "assets/img/doppler.jpg";
import TranscendingEgo from "assets/img/transcending_ego.jpg";
import Kiyoshi from "assets/img/kiyoshi.jpg";
import XVII from "assets/img/xvii.jpg";
import Consciousness from "assets/img/consciousness.jpg";
import Maya1 from "assets/img/maya_1.jpg";
import Maya2 from "assets/img/maya_2.jpg";
import Romina from "assets/img/romina.jpg";
import Daniela from "assets/img/daniela.jpg";
import Epilogue from "assets/img/epilogue.jpg";
import DNA1 from "assets/img/dna_1.jpg";
import DNA2 from "assets/img/dna_2.jpg";
// import Bianca from "assets/img/bianca.jpg";

import AndromedaVideo from "assets/videos/andromeda.mp4";
import VersusVideo from "assets/videos/versus.mp4";
import ViscosityVideo from "assets/videos/viscosity_1080.mp4";
import AuraVideo from "assets/videos/aura.mp4";
import DopplerVideo from "assets/videos/doppler.mp4";
import ConsciousnessVideo from "assets/videos/consciousness_1080.mp4";

export type PortfolioItem = {
    title: string;
    image: string;
    video?: string;
    palette: string[];
};

export const portfolioData: PortfolioItem[] = [
    {
        title: "DADA YAGA, 2018",
        image: DadaYaga,
        palette: ["#84C1D9", "#D97904", "#8C0303", "#012611"],
    },
    {
        title: "ANDROMEDA, 2018",
        image: Andromeda,
        video: AndromedaVideo,
        palette: ["#66C4D9", "#B9BF04", "#03A62C", "#02732A"],
    },
    {
        title: "VERSUS I, 2018",
        image: Versus1,
        video: VersusVideo,
        palette: ["#0BADBF", "#F2E1C2", "#D9923B", "#BF612A"],
    },
    {
        title: "VERSUS II, 2018",
        image: Versus2,
        palette: ["#89D9D9", "#0FBFBF", "#0A96A6", "#07748C"],
    },
    {
        title: "VISCOSITY, 2021",
        image: Viscosity,
        video: ViscosityVideo,
        palette: ["#05F2C7", "#05F2F2", "#04ADBF", "#0378A6"],
    },
    {
        title: "AURA, 2019",
        image: Aura,
        video: AuraVideo,
        palette: ["#CCD9D7", "#03A696", "#027368", "#366273"],
    },
    {
        title: "MIMIKRY, 2018",
        image: Mimikry,
        palette: ["#468C4B", "#F2E5D5", "#F2A341", "#8C694A"],
    },
    {
        title: "A CURIOUS THING, 2017",
        image: ACuriousThing,
        palette: ["#F0F2F0", "#D0D9D4", "#585F73", "#1D1926"],
    },
    {
        title: "DOPPLER I, 2021",
        image: Doppler,
        video: DopplerVideo,
        palette: ["#533D73", "#4843D9", "#23288C", "#192773"],
    },
    {
        title: "TRANSCENDING EGO, 2017",
        image: TranscendingEgo,
        palette: ["#D9D3B8", "#BFB963", "#A69258", "#403C26"],
    },
    {
        title: "KIYOSHI, 2022",
        image: Kiyoshi,
        palette: ["#F2BE22", "#F29441", "#D93611", "#8C2016"],
    },
    {
        title: "XVII, 2022",
        image: XVII,
        palette: ["#F2C641", "#F2BB77", "#D96B2B", "#8C3616"],
    },
    {
        title: "CONSCIOUSNESS, 2017",
        image: Consciousness,
        video: ConsciousnessVideo,
        palette: ["#A60522", "#D9C5C1", "#260101", "#010326"],
    },
    {
        title: "MAYA I, 2017",
        image: Maya1,
        palette: ["#D93232", "#D9B97E", "#BF7960", "#8C0303"],
    },
    {
        title: "MAYA II, 2017",
        image: Maya2,
        palette: ["#6C6C73", "#D9AE89", "#BF6550", "#591818"],
    },
    {
        title: "ROMINA, 2016",
        image: Romina,
        palette: ["#D9BA82", "#D99E6A", "#BF6341", "#8C1F1F"],
    },
    {
        title: "DANIELA, 2016",
        image: Daniela,
        palette: ["#D9D9D9", "#A6A6A6", "#595959", "#262626"],
    },
    {
        title: "EPILOGUE, 2018",
        image: Epilogue,
        palette: ["#E4EBF2", "#AEBCBF", "#BF7C63", "#8C423B"],
    },
    {
        title: "DNA (XY) I, 2017",
        image: DNA1,
        palette: ["#D9D9D9", "#A6A5A4", "#593831", "#261717"],
    },
    {
        title: "DNA (XY) II, 2017",
        image: DNA2,
        palette: ["#D9D9D9", "#A68C8A", "#735856", "#402E2C"],
    },
    /*{
        title: "BIANCA, 2016",
        image: Bianca,
        palette: ["#000000", "#000000", "#000000", "#000000"],
    },*/
];
