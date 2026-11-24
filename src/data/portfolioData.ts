// Artworks (1200px height)
import ACuriousThing from "assets/img/a_curious_thing.jpg";
import Andromeda from "assets/img/andromeda.jpg";
import Apophenia from "assets/img/apophenia.jpg";
import Aura from "assets/img/aura.jpg";
import Bianca from "assets/img/bianca.jpg";
import Consciousness from "assets/img/consciousness.jpg";
import Coriolis from "assets/img/coriolis.jpg";
import DadaYaga from "assets/img/dada_yaga.jpg";
import Daniela from "assets/img/daniela.jpg";
import DNA1 from "assets/img/dna_1.jpg";
import DNA2 from "assets/img/dna_2.jpg";
import Doppler from "assets/img/doppler.jpg";
import Epilogue from "assets/img/epilogue.jpg";
import Kiyoshi from "assets/img/kiyoshi.jpg";
import Maya1 from "assets/img/maya_1.jpg";
import Maya2 from "assets/img/maya_2.jpg";
import Mimikry from "assets/img/mimikry.jpg";
import TranscendingEgo from "assets/img/transcending_ego.jpg";
import Versus1 from "assets/img/versus_1.jpg";
import Versus2 from "assets/img/versus_2.jpg";
import Viscosity from "assets/img/viscosity.jpg";
import XVII from "assets/img/xvii.jpg";

// Thumbnails (600px height)
import ACuriousThingThumbnail from "assets/img/thumbnails/a_curious_thing.jpg";
import AndromedaThumbnail from "assets/img/thumbnails/andromeda.jpg";
import ApopheniaThumbnail from "assets/img/thumbnails/apophenia.jpg";
import AuraThumbnail from "assets/img/thumbnails/aura.jpg";
import BiancaThumbnail from "assets/img/thumbnails/bianca.jpg";
import ConsciousnessThumbnail from "assets/img/thumbnails/consciousness.jpg";
import CoriolisThumbnail from "assets/img/thumbnails/coriolis.jpg";
import DadaYagaThumbnail from "assets/img/thumbnails/dada_yaga.jpg";
import DanielaThumbnail from "assets/img/thumbnails/daniela.jpg";
import DNA1Thumbnail from "assets/img/thumbnails/dna_1.jpg";
import DNA2Thumbnail from "assets/img/thumbnails/dna_2.jpg";
import DopplerThumbnail from "assets/img/thumbnails/doppler.jpg";
import EpilogueThumbnail from "assets/img/thumbnails/epilogue.jpg";
import KiyoshiThumbnail from "assets/img/thumbnails/kiyoshi.jpg";
import Maya1Thumbnail from "assets/img/thumbnails/maya_1.jpg";
import Maya2Thumbnail from "assets/img/thumbnails/maya_2.jpg";
import MimikryThumbnail from "assets/img/thumbnails/mimikry.jpg";
import TranscendingEgoThumbnail from "assets/img/thumbnails/transcending_ego.jpg";
import Versus1Thumbnail from "assets/img/thumbnails/versus_1.jpg";
import Versus2Thumbnail from "assets/img/thumbnails/versus_2.jpg";
import ViscosityThumbnail from "assets/img/thumbnails/viscosity.jpg";
import XVIIThumbnail from "assets/img/thumbnails/xvii.jpg";

// Videos (1080px height)
import AndromedaVideo from "assets/videos/andromeda.mp4";
import AndromedaAudio from "assets/videos/andromeda.ogg";
import AuraVideo from "assets/videos/aura.mp4";
import AuraAudio from "assets/videos/aura.ogg";
import ConsciousnessVideo from "assets/videos/consciousness.mp4";
import ConsciousnessAudio from "assets/videos/consciousness.ogg";
import DopplerVideo from "assets/videos/doppler.mp4";
import DopplerAudio from "assets/videos/doppler.ogg";
import VersusVideo from "assets/videos/versus.mp4";
import VersusAudio from "assets/videos/versus.ogg";
import ViscosityVideo from "assets/videos/viscosity.mp4";
import ViscosityAudio from "assets/videos/viscosity.ogg";

export type PortfolioItem = {
    alt: string;
    aspectRatio: string;
    audio?: string;
    image: string;
    imageSet: string;
    thumbnailMargin?: string;
    title: string;
    type: "analog photograph" | "digital photograph" | "digital artwork";
    video?: string;
    year: string;
};

export const portfolioData: PortfolioItem[] = [
    {
        alt: "Person in red-and-white patterned robes and a golden sunburst headdress, holding branches among white blossoms.",
        aspectRatio: "1/1",
        image: DadaYaga,
        imageSet: `${DadaYagaThumbnail} 600w, ${DadaYaga} 1200w`,
        title: "DADA YAGA",
        type: "analog photograph",
        year: "2018",
    },
    {
        alt: "Shirtless man with a shaved head, eyes closed, standing in tall grass and blue wildflowers.",
        aspectRatio: "1/1",
        audio: AndromedaAudio,
        image: Andromeda,
        imageSet: `${AndromedaThumbnail} 600w, ${Andromeda} 1200w`,
        title: "ANDROMEDA",
        type: "analog photograph",
        video: AndromedaVideo,
        year: "2018",
    },
    {
        alt: "Woman in a silver outfit on a rock in the dunes, reaching toward a bright blue sky.",
        aspectRatio: "1/1",
        audio: VersusAudio,
        image: Versus1,
        imageSet: `${Versus1Thumbnail} 600w, ${Versus1} 1200w`,
        title: "VERSUS I",
        type: "analog photograph",
        video: VersusVideo,
        year: "2018",
    },
    {
        alt: "Woman in a crumpled silver foil coat leaning backward against a turquoise sky, face hidden.",
        aspectRatio: "1/1",
        image: Versus2,
        imageSet: `${Versus2Thumbnail} 600w, ${Versus2} 1200w`,
        title: "VERSUS II",
        type: "analog photograph",
        year: "2018",
    },
    {
        alt: "3D render of two chrome humanoid figures face to face, surrounded by floating blue spheres.",
        aspectRatio: "1/1",
        audio: ViscosityAudio,
        image: Viscosity,
        imageSet: `${ViscosityThumbnail} 600w, ${Viscosity} 1200w`,
        title: "VISCOSITY",
        type: "digital artwork",
        video: ViscosityVideo,
        year: "2021",
    },
    {
        alt: "Translucent glass figure with a skull-like face emerging from white smoke.",
        aspectRatio: "1/1",
        audio: AuraAudio,
        image: Aura,
        imageSet: `${AuraThumbnail} 600w, ${Aura} 1200w`,
        title: "AURA",
        type: "analog photograph",
        video: AuraVideo,
        year: "2019",
    },
    {
        alt: "Figure in a teddy bear costume walking through sand dunes, a faint rainbow in the sky.",
        aspectRatio: "1/1",
        image: Mimikry,
        imageSet: `${MimikryThumbnail} 600w, ${Mimikry} 1200w`,
        title: "MIMIKRY",
        type: "analog photograph",
        year: "2018",
    },
    {
        alt: "Silver-clad figure with a cloud for a head, sitting on a black and white checkerboard among clouds.",
        aspectRatio: "1/1",
        image: ACuriousThing,
        imageSet: `${ACuriousThingThumbnail} 600w, ${ACuriousThing} 1200w`,
        title: "A CURIOUS THING",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Glowing rainbow-colored holographic figure floating above rocks against a deep blue twilight sky.",
        aspectRatio: "1/1",
        audio: DopplerAudio,
        image: Doppler,
        imageSet: `${DopplerThumbnail} 600w, ${Doppler} 1200w`,
        title: "DOPPLER I",
        type: "digital artwork",
        video: DopplerVideo,
        year: "2021",
    },
    {
        alt: "Figure from behind in a sculptural camouflage garment with horn shapes, a red apple falling beside them.",
        aspectRatio: "3/4",
        image: Kiyoshi,
        imageSet: `${KiyoshiThumbnail} 600w, ${Kiyoshi} 1200w`,
        title: "KIYOSHI",
        type: "digital artwork",
        year: "2022",
    },
    {
        alt: "3D render of an ornate metallic mask with filigree and spikes in warm golden light.",
        aspectRatio: "3/4",
        image: XVII,
        imageSet: `${XVIIThumbnail} 600w, ${XVII} 1200w`,
        title: "XVII",
        type: "digital artwork",
        year: "2022",
    },
    {
        alt: "Bust whose head is replaced by a bouquet of white roses and pale leaves on a dark olive background.",
        aspectRatio: "7/10",
        image: TranscendingEgo,
        imageSet: `${TranscendingEgoThumbnail} 600w, ${TranscendingEgo} 1200w`,
        title: "TRANSCENDING EGO",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Person hidden behind a red oriental carpet, one hand reaching out holding a red mask.",
        aspectRatio: "49/75",
        audio: ConsciousnessAudio,
        image: Consciousness,
        imageSet: `${ConsciousnessThumbnail} 600w, ${Consciousness} 1200w`,
        title: "CONSCIOUSNESS",
        type: "digital photograph",
        video: ConsciousnessVideo,
        year: "2017",
    },
    {
        alt: "Collage of small square tiles like a stained-glass window, showing fragments of a face.",
        aspectRatio: "7/10",
        image: Maya1,
        imageSet: `${Maya1Thumbnail} 600w, ${Maya1} 1200w`,
        title: "MAYA I",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Abstract collage of marble and terracotta tiles with a single human eye and white rope.",
        aspectRatio: "2/3",
        image: Maya2,
        imageSet: `${Maya2Thumbnail} 600w, ${Maya2} 1200w`,
        title: "MAYA II",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Portrait of a young woman with curly auburn hair and an intense gaze against a dark background.",
        aspectRatio: "83/120",
        image: Apophenia,
        imageSet: `${ApopheniaThumbnail} 600w, ${Apophenia} 1200w`,
        title: "APOPHENIA",
        type: "digital photograph",
        year: "2016",
    },
    {
        alt: "Portrait of a young woman with long light brown hair in a black turtleneck against a dark background.",
        aspectRatio: "137/200",
        image: Bianca,
        imageSet: `${BiancaThumbnail} 600w, ${Bianca} 1200w`,
        thumbnailMargin: "-12% 0 0",
        title: "BIANCA",
        type: "digital photograph",
        year: "2016",
    },
    {
        alt: "Woman in silver trousers and a woven harness top posing among large industrial pipes.",
        aspectRatio: "49/75",
        image: Coriolis,
        imageSet: `${CoriolisThumbnail} 600w, ${Coriolis} 1200w`,
        thumbnailMargin: "-10% 0 0",
        title: "CORIOLIS",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Shirtless black man with glistening skin, head turned aside and one arm raised, on light grey.",
        aspectRatio: "2/3",
        image: DNA1,
        imageSet: `${DNA1Thumbnail} 600w, ${DNA1} 1200w`,
        title: "DNA (XY) I",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Close-up of two men with glossy dark skin, one face upside down, a hand resting on a cheek.",
        aspectRatio: "2/3",
        image: DNA2,
        imageSet: `${DNA2Thumbnail} 600w, ${DNA2} 1200w`,
        title: "DNA (XY) II",
        type: "digital photograph",
        year: "2017",
    },
    {
        alt: "Black and white portrait of a woman with slicked-back hair, the face covered in dappled light.",
        aspectRatio: "2/3",
        image: Daniela,
        imageSet: `${DanielaThumbnail} 600w, ${Daniela} 1200w`,
        thumbnailMargin: "-6% 0 0",
        title: "DANIELA",
        type: "analog photograph",
        year: "2016",
    },
    {
        alt: "Woman in a white dress at the shore embracing a horned creature covered in dark seaweed.",
        aspectRatio: "1/1",
        image: Epilogue,
        imageSet: `${EpilogueThumbnail} 600w, ${Epilogue} 1200w`,
        title: "EPILOGUE",
        type: "analog photograph",
        year: "2018",
    },
];
