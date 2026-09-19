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
import Apophenia from "assets/img/apophenia.jpg";
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
import Apophenia415w from "assets/img/thumbnails/apophenia-415w.jpg";
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
    imageSet: string;
    video?: string;
    aspectRatio?: string;
};

export const portfolioData: PortfolioItem[] = [
    {
        title: "DADA YAGA, 2018",
        image: DadaYaga,
        imageSet: `${DadaYaga600w} 600w, ${DadaYaga} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "ANDROMEDA, 2018",
        image: Andromeda,
        imageSet: `${Andromeda600w} 600w, ${Andromeda} 1200w`,
        video: AndromedaVideo,
        aspectRatio: "1/1",
    },
    {
        title: "VERSUS I, 2018",
        image: Versus1,
        imageSet: `${Versus1600w} 600w, ${Versus1} 1200w`,
        video: VersusVideo,
        aspectRatio: "1/1",
    },
    {
        title: "VERSUS II, 2018",
        image: Versus2,
        imageSet: `${Versus2600w} 600w, ${Versus2} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "VISCOSITY, 2021",
        image: Viscosity,
        imageSet: `${Viscosity600w} 600w, ${Viscosity} 1200w`,
        video: ViscosityVideo,
        aspectRatio: "1/1",
    },
    {
        title: "AURA, 2019",
        image: Aura,
        imageSet: `${Aura600w} 600w, ${Aura} 1200w`,
        video: AuraVideo,
        aspectRatio: "1/1",
    },
    {
        title: "MIMIKRY, 2018",
        image: Mimikry,
        imageSet: `${Mimikry600w} 600w, ${Mimikry} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "A CURIOUS THING, 2017",
        image: ACuriousThing,
        imageSet: `${ACuriousThing600w} 600w, ${ACuriousThing} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "DOPPLER I, 2021",
        image: Doppler,
        imageSet: `${Doppler600w} 600w, ${Doppler} 1200w`,
        video: DopplerVideo,
        aspectRatio: "1/1",
    },
    {
        title: "TRANSCENDING EGO, 2017",
        image: TranscendingEgo,
        imageSet: `${TranscendingEgo420w} 600w, ${TranscendingEgo} 1200w`,
    },
    {
        title: "KIYOSHI, 2022",
        image: Kiyoshi,
        imageSet: `${Kiyoshi450w} 600w, ${Kiyoshi} 1200w`,
    },
    {
        title: "XVII, 2022",
        image: XVII,
        imageSet: `${XVII450w} 600w, ${XVII} 1200w`,
    },
    {
        title: "CONSCIOUSNESS, 2017",
        image: Consciousness,
        imageSet: `${Consciousness392w} 600w, ${Consciousness} 1200w`,
        video: ConsciousnessVideo,
    },
    {
        title: "MAYA I, 2017",
        image: Maya1,
        imageSet: `${Maya1420w} 600w, ${Maya1} 1200w`,
    },
    {
        title: "MAYA II, 2017",
        image: Maya2,
        imageSet: `${Maya2400w} 600w, ${Maya2} 1200w`,
    },
    {
        title: "APOPHENIA, 2016",
        image: Apophenia,
        imageSet: `${Apophenia415w} 600w, ${Apophenia} 1200w`,
    },
    {
        title: "DANIELA, 2016",
        image: Daniela,
        imageSet: `${Daniela400w} 600w, ${Daniela} 1200w`,
    },
    {
        title: "EPILOGUE, 2018",
        image: Epilogue,
        imageSet: `${Epilogue600w} 600w, ${Epilogue} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "DNA (XY) I, 2017",
        image: DNA1,
        imageSet: `${DNA1400w} 600w, ${DNA1} 1200w`,
    },
    {
        title: "DNA (XY) II, 2017",
        image: DNA2,
        imageSet: `${DNA2400w} 600w, ${DNA2} 1200w`,
    },
];
