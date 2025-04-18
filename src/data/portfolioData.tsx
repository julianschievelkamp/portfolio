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

import DadaYaga600w from "assets/img/thumbnails/dada_yaga-600w.jpg";
import Andromeda600w from "assets/img/thumbnails/andromeda-600w.jpg";
import Versus1600w from "assets/img/thumbnails/versus_1-600w.jpg";
import Versus2600w from "assets/img/thumbnails/versus_2-600w.jpg";
import Viscosity600w from "assets/img/thumbnails/viscosity-600w.jpg";
import Aura600w from "assets/img/thumbnails/aura-600w.jpg";
import Mimikry600w from "assets/img/thumbnails/mimikry-600w.jpg";
import ACuriousThing600w from "assets/img/thumbnails/a_curious_thing-600w.jpg";
import Doppler600w from "assets/img/thumbnails/doppler-600w.jpg";
import TranscendingEgo420w from "assets/img/thumbnails/transcending_ego-420w.jpg";
import Kiyoshi450w from "assets/img/thumbnails/kiyoshi-450w.jpg";
import XVII450w from "assets/img/thumbnails/xvii-450w.jpg";
import Consciousness392w from "assets/img/thumbnails/consciousness-392w.jpg";
import Maya1420w from "assets/img/thumbnails/maya_1-420w.jpg";
import Maya2400w from "assets/img/thumbnails/maya_2-400w.jpg";
import Romina415w from "assets/img/thumbnails/romina-415w.jpg";
import Daniela400w from "assets/img/thumbnails/daniela-400w.jpg";
import Epilogue600w from "assets/img/thumbnails/epilogue-600w.jpg";
import DNA1400w from "assets/img/thumbnails/dna_1-400w.jpg";
import DNA2400w from "assets/img/thumbnails/dna_2-400w.jpg";

import AndromedaVideo from "assets/videos/andromeda.mp4";
import VersusVideo from "assets/videos/versus.mp4";
import ViscosityVideo from "assets/videos/viscosity_1080.mp4";
import AuraVideo from "assets/videos/aura.mp4";
import DopplerVideo from "assets/videos/doppler.mp4";
import ConsciousnessVideo from "assets/videos/consciousness_1080.mp4";

export type PortfolioItem = {
    title: string;
    image: string;
    imageSet?: string;
    sizes?: string;
    video?: string;
    palette: string[];
};

export const portfolioData: PortfolioItem[] = [
    {
        title: "DADA YAGA, 2018",
        image: DadaYaga,
        imageSet: `${DadaYaga600w} 600w, ${DadaYaga} 1200w`,
        palette: ["#84C1D9", "#D97904", "#8C0303", "#012611"],
    },
    {
        title: "ANDROMEDA, 2018",
        image: Andromeda,
        imageSet: `${Andromeda600w} 600w, ${Andromeda} 1200w`,
        video: AndromedaVideo,
        palette: ["#66C4D9", "#B9BF04", "#03A62C", "#02732A"],
    },
    {
        title: "VERSUS I, 2018",
        image: Versus1,
        imageSet: `${Versus1600w} 600w, ${Versus1} 1200w`,
        video: VersusVideo,
        palette: ["#0BADBF", "#F2E1C2", "#D9923B", "#BF612A"],
    },
    {
        title: "VERSUS II, 2018",
        image: Versus2,
        imageSet: `${Versus2600w} 600w, ${Versus2} 1200w`,
        palette: ["#89D9D9", "#0FBFBF", "#0A96A6", "#07748C"],
    },
    {
        title: "VISCOSITY, 2021",
        image: Viscosity,
        imageSet: `${Viscosity600w} 600w, ${Viscosity} 1200w`,
        video: ViscosityVideo,
        palette: ["#05F2C7", "#05F2F2", "#04ADBF", "#0378A6"],
    },
    {
        title: "AURA, 2019",
        image: Aura,
        imageSet: `${Aura600w} 600w, ${Aura} 1200w`,
        video: AuraVideo,
        palette: ["#CCD9D7", "#03A696", "#027368", "#366273"],
    },
    {
        title: "MIMIKRY, 2018",
        image: Mimikry,
        imageSet: `${Mimikry600w} 600w, ${Mimikry} 1200w`,
        palette: ["#468C4B", "#F2E5D5", "#F2A341", "#8C694A"],
    },
    {
        title: "A CURIOUS THING, 2017",
        image: ACuriousThing,
        imageSet: `${ACuriousThing600w} 600w, ${ACuriousThing} 1200w`,
        palette: ["#F0F2F0", "#D0D9D4", "#585F73", "#1D1926"],
    },
    {
        title: "DOPPLER I, 2021",
        image: Doppler,
        imageSet: `${Doppler600w} 600w, ${Doppler} 1200w`,
        video: DopplerVideo,
        palette: ["#533D73", "#4843D9", "#23288C", "#192773"],
    },
    {
        title: "TRANSCENDING EGO, 2017",
        image: TranscendingEgo,
        imageSet: `${TranscendingEgo420w} 600w, ${TranscendingEgo} 1200w`,
        palette: ["#D9D3B8", "#BFB963", "#A69258", "#403C26"],
    },
    {
        title: "KIYOSHI, 2022",
        image: Kiyoshi,
        imageSet: `${Kiyoshi450w} 600w, ${Kiyoshi} 1200w`,
        palette: ["#F2BE22", "#F29441", "#D93611", "#8C2016"],
    },
    {
        title: "XVII, 2022",
        image: XVII,
        imageSet: `${XVII450w} 600w, ${XVII} 1200w`,
        palette: ["#F2C641", "#F2BB77", "#D96B2B", "#8C3616"],
    },
    {
        title: "CONSCIOUSNESS, 2017",
        image: Consciousness,
        imageSet: `${Consciousness392w} 600w, ${Consciousness} 1200w`,
        video: ConsciousnessVideo,
        palette: ["#A60522", "#D9C5C1", "#260101", "#010326"],
    },
    {
        title: "MAYA I, 2017",
        image: Maya1,
        imageSet: `${Maya1420w} 600w, ${Maya1} 1200w`,
        palette: ["#D93232", "#D9B97E", "#BF7960", "#8C0303"],
    },
    {
        title: "MAYA II, 2017",
        image: Maya2,
        imageSet: `${Maya2400w} 600w, ${Maya2} 1200w`,
        palette: ["#6C6C73", "#D9AE89", "#BF6550", "#591818"],
    },
    {
        title: "ROMINA, 2016",
        image: Romina,
        imageSet: `${Romina415w} 600w, ${Romina} 1200w`,
        palette: ["#D9BA82", "#D99E6A", "#BF6341", "#8C1F1F"],
    },
    {
        title: "DANIELA, 2016",
        image: Daniela,
        imageSet: `${Daniela400w} 600w, ${Daniela} 1200w`,
        palette: ["#D9D9D9", "#A6A6A6", "#595959", "#262626"],
    },
    {
        title: "EPILOGUE, 2018",
        image: Epilogue,
        imageSet: `${Epilogue600w} 600w, ${Epilogue} 1200w`,
        palette: ["#E4EBF2", "#AEBCBF", "#BF7C63", "#8C423B"],
    },
    {
        title: "DNA (XY) I, 2017",
        image: DNA1,
        imageSet: `${DNA1400w} 600w, ${DNA1} 1200w`,
        palette: ["#D9D9D9", "#A6A5A4", "#593831", "#261717"],
    },
    {
        title: "DNA (XY) II, 2017",
        image: DNA2,
        imageSet: `${DNA2400w} 600w, ${DNA2} 1200w`,
        palette: ["#D9D9D9", "#A68C8A", "#735856", "#402E2C"],
    },
];
