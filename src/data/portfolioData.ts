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
import Coriolis from "assets/img/coriolis.jpg";
import Bianca from "assets/img/bianca.jpg";

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
import Coriolis392w from "assets/img/thumbnails/coriolis-392w.jpg";
import Bianca411w from "assets/img/thumbnails/bianca-411w.jpg";

import AndromedaVideo from "assets/videos/andromeda.mp4";
import AndromedaAudio from "assets/videos/andromeda.ogg";
import VersusVideo from "assets/videos/versus.mp4";
import VersusAudio from "assets/videos/versus.ogg";
import AuraVideo from "assets/videos/aura.mp4";
import AuraAudio from "assets/videos/aura.ogg";
import ViscosityVideo from "assets/videos/viscosity.mp4";
import ViscosityAudio from "assets/videos/viscosity.ogg";
import DopplerVideo from "assets/videos/doppler.mp4";
import DopplerAudio from "assets/videos/doppler.ogg";
import ConsciousnessVideo from "assets/videos/consciousness.mp4";
import ConsciousnessAudio from "assets/videos/consciousness.ogg";

export type PortfolioItem = {
    title: string;
    year: string;
    type: "analog photograph" | "digital photograph" | "digital artwork";
    alt: string;
    image: string;
    imageSet: string;
    aspectRatio: string;
    thumbnailMargin?: string;
    video?: string;
    audio?: string;
};

export const portfolioData: PortfolioItem[] = [
    {
        title: "DADA YAGA",
        year: "2018",
        type: "analog photograph",
        alt: "Person in red-and-white patterned robes and a golden sunburst headdress, holding branches among white blossoms.",
        image: DadaYaga,
        imageSet: `${DadaYaga600w} 600w, ${DadaYaga} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "ANDROMEDA",
        year: "2018",
        type: "analog photograph",
        alt: "Shirtless man with a shaved head, eyes closed, standing in tall grass and blue wildflowers.",
        image: Andromeda,
        imageSet: `${Andromeda600w} 600w, ${Andromeda} 1200w`,
        video: AndromedaVideo,
        audio: AndromedaAudio,
        aspectRatio: "1/1",
    },
    {
        title: "VERSUS I",
        year: "2018",
        type: "analog photograph",
        alt: "Woman in a silver outfit on a rock in the dunes, reaching toward a bright blue sky.",
        image: Versus1,
        imageSet: `${Versus1600w} 600w, ${Versus1} 1200w`,
        video: VersusVideo,
        audio: VersusAudio,
        aspectRatio: "1/1",
    },
    {
        title: "VERSUS II",
        year: "2018",
        type: "analog photograph",
        alt: "Woman in a crumpled silver foil coat leaning backward against a turquoise sky, face hidden.",
        image: Versus2,
        imageSet: `${Versus2600w} 600w, ${Versus2} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "VISCOSITY",
        year: "2021",
        type: "digital artwork",
        alt: "3D render of two chrome humanoid figures face to face, surrounded by floating blue spheres.",
        image: Viscosity,
        imageSet: `${Viscosity600w} 600w, ${Viscosity} 1200w`,
        video: ViscosityVideo,
        audio: ViscosityAudio,
        aspectRatio: "1/1",
    },
    {
        title: "AURA",
        year: "2019",
        type: "analog photograph",
        alt: "Translucent glass figure with a skull-like face emerging from white smoke.",
        image: Aura,
        imageSet: `${Aura600w} 600w, ${Aura} 1200w`,
        video: AuraVideo,
        audio: AuraAudio,
        aspectRatio: "1/1",
    },
    {
        title: "MIMIKRY",
        year: "2018",
        type: "analog photograph",
        alt: "Figure in a teddy bear costume walking through sand dunes, a faint rainbow in the sky.",
        image: Mimikry,
        imageSet: `${Mimikry600w} 600w, ${Mimikry} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "A CURIOUS THING",
        year: "2017",
        type: "digital photograph",
        alt: "Silver-clad figure with a cloud for a head, sitting on a black and white checkerboard among clouds.",
        image: ACuriousThing,
        imageSet: `${ACuriousThing600w} 600w, ${ACuriousThing} 1200w`,
        aspectRatio: "1/1",
    },
    {
        title: "DOPPLER I",
        year: "2021",
        type: "digital artwork",
        alt: "Glowing rainbow-colored holographic figure floating above rocks against a deep blue twilight sky.",
        image: Doppler,
        imageSet: `${Doppler600w} 600w, ${Doppler} 1200w`,
        video: DopplerVideo,
        audio: DopplerAudio,
        aspectRatio: "1/1",
    },
    {
        title: "KIYOSHI",
        year: "2022",
        type: "digital artwork",
        alt: "Figure from behind in a sculptural camouflage garment with horn shapes, a red apple falling beside them.",
        image: Kiyoshi,
        imageSet: `${Kiyoshi450w} 600w, ${Kiyoshi} 1200w`,
        aspectRatio: "3/4",
    },
    {
        title: "XVII",
        year: "2022",
        type: "digital artwork",
        alt: "3D render of an ornate metallic mask with filigree and spikes in warm golden light.",
        image: XVII,
        imageSet: `${XVII450w} 600w, ${XVII} 1200w`,
        aspectRatio: "3/4",
    },
    {
        title: "TRANSCENDING EGO",
        year: "2017",
        type: "digital photograph",
        alt: "Bust whose head is replaced by a bouquet of white roses and pale leaves on a dark olive background.",
        image: TranscendingEgo,
        imageSet: `${TranscendingEgo420w} 600w, ${TranscendingEgo} 1200w`,
        aspectRatio: "7/10",
    },
    {
        title: "CONSCIOUSNESS",
        year: "2017",
        type: "digital photograph",
        alt: "Person hidden behind a red oriental carpet, one hand reaching out holding a red mask.",
        image: Consciousness,
        imageSet: `${Consciousness392w} 600w, ${Consciousness} 1200w`,
        video: ConsciousnessVideo,
        audio: ConsciousnessAudio,
        aspectRatio: "49/75",
    },
    {
        title: "MAYA I",
        year: "2017",
        type: "digital photograph",
        alt: "Collage of small square tiles like a stained-glass window, showing fragments of a face.",
        image: Maya1,
        imageSet: `${Maya1420w} 600w, ${Maya1} 1200w`,
        aspectRatio: "7/10",
    },
    {
        title: "MAYA II",
        year: "2017",
        type: "digital photograph",
        alt: "Abstract collage of marble and terracotta tiles with a single human eye and white rope.",
        image: Maya2,
        imageSet: `${Maya2400w} 600w, ${Maya2} 1200w`,
        aspectRatio: "2/3",
    },
    {
        title: "APOPHENIA",
        year: "2016",
        type: "digital photograph",
        alt: "Portrait of a young woman with curly auburn hair and an intense gaze against a dark background.",
        image: Apophenia,
        imageSet: `${Apophenia415w} 600w, ${Apophenia} 1200w`,
        aspectRatio: "83/120",
    },
    {
        title: "BIANCA",
        year: "2016",
        type: "digital photograph",
        alt: "Portrait of a young woman with long light brown hair in a black turtleneck against a dark background.",
        image: Bianca,
        imageSet: `${Bianca411w} 600w, ${Bianca} 1200w`,
        thumbnailMargin: "-12% 0 0",
        aspectRatio: "137/200",
    },
    {
        title: "CORIOLIS",
        year: "2017",
        type: "digital photograph",
        alt: "Woman in silver trousers and a woven harness top posing among large industrial pipes.",
        image: Coriolis,
        imageSet: `${Coriolis392w} 600w, ${Coriolis} 1200w`,
        thumbnailMargin: "-10% 0 0",
        aspectRatio: "49/75",
    },
    {
        title: "DNA (XY) I",
        year: "2017",
        type: "digital photograph",
        alt: "Shirtless man with glistening skin, head turned aside and one arm raised, on light grey.",
        image: DNA1,
        imageSet: `${DNA1400w} 600w, ${DNA1} 1200w`,
        aspectRatio: "2/3",
    },
    {
        title: "DNA (XY) II",
        year: "2017",
        type: "digital photograph",
        alt: "Close-up of two men with glossy dark skin, one face upside down, a hand resting on a cheek.",
        image: DNA2,
        imageSet: `${DNA2400w} 600w, ${DNA2} 1200w`,
        aspectRatio: "2/3",
    },
    {
        title: "DANIELA",
        year: "2016",
        type: "analog photograph",
        alt: "Black and white portrait of a woman with slicked-back hair, the face covered in dappled light.",
        image: Daniela,
        imageSet: `${Daniela400w} 600w, ${Daniela} 1200w`,
        thumbnailMargin: "-6% 0 0",
        aspectRatio: "2/3",
    },
    {
        title: "EPILOGUE",
        year: "2018",
        type: "analog photograph",
        alt: "Woman in a white dress at the shore embracing a horned creature covered in dark seaweed.",
        image: Epilogue,
        imageSet: `${Epilogue600w} 600w, ${Epilogue} 1200w`,
        aspectRatio: "1/1",
    },
];
