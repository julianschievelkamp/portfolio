import { useCallback, useEffect, useRef } from "react";

// Kurze Ein- und Ausblendung in Sekunden, damit Start und Stopp mitten in der Welle nicht knacken
const FADE_IN_SECONDS = 0.02;
const FADE_OUT_SECONDS = 0.03;
// Dauer der Überblendung zwischen Ende und Anfang des Loops in Sekunden (zu Testzwecken anpassbar)
const CROSSFADE_SECONDS = 0.1;
// Wie weit im Voraus Durchläufe eingeplant werden und wie oft nachgeplant wird
const LOOKAHEAD_SECONDS = 20;
const SCHEDULER_INTERVAL_MS = 1000;

// Die Audio Session API (Safari ab 16.4) ist noch nicht in den TypeScript-DOM-Typen enthalten
interface AudioSession {
    type:
        | "auto"
        | "playback"
        | "transient"
        | "transient-solo"
        | "ambient"
        | "play-and-record";
}

type NavigatorWithAudioSession = Navigator & { audioSession?: AudioSession };

interface PlayingSource {
    gain: GainNode;
    source: AudioBufferSourceNode;
}

// Ein laufender Loop besteht aus mehreren eingeplanten Durchläufen, die sich überblenden
interface PlayingLoop {
    timer: ReturnType<typeof setInterval>;
    voices: Set<PlayingSource>;
}

// Spielt eine Audiodatei lückenlos im Loop ab (Web Audio API).
// Ein <audio loop>-Element erzeugt je nach Browser eine hörbare Pause am Loop-Punkt.
// Jeder Durchlauf wird einzeln eingeplant und mit dem nächsten überblendet,
// damit auch Dateien mit stillem Ende sauber ineinander übergehen.
export const useGaplessAudio = (src?: string) => {
    const contextRef = useRef<AudioContext | null>(null);
    const bufferPromiseRef = useRef<Promise<AudioBuffer | null> | null>(null);
    const playingRef = useRef<PlayingLoop | null>(null);
    // Wird bei jedem Start/Stopp erhöht, damit veraltete asynchrone Starts verworfen werden
    const requestRef = useRef(0);

    const stop = useCallback(() => {
        requestRef.current += 1;

        const context = contextRef.current;
        const playing = playingRef.current;
        if (!playing || !context) return;

        clearInterval(playing.timer);

        const now = context.currentTime;
        const stopTime = now + FADE_OUT_SECONDS;

        // Alle Durchläufe blenden auf abgetrennten Referenzen aus, ein neuer Start ist sofort möglich
        playing.voices.forEach(({ gain, source }) => {
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(gain.gain.value, now);
            gain.gain.linearRampToValueAtTime(0, stopTime);
            source.stop(stopTime);
        });

        playingRef.current = null;
    }, []);

    // Muss innerhalb einer Nutzerinteraktion (Klick) aufgerufen werden,
    // damit der AudioContext entsperrt wird. Lädt und dekodiert die Datei einmalig.
    const prepare = useCallback((): Promise<AudioBuffer | null> => {
        if (!src) return Promise.resolve(null);

        if (!contextRef.current) {
            // iOS dämpft Web Audio standardmäßig bei aktivem Stumm-Schalter ("ambient").
            // "playback" verhält sich wie ein <video>-Element und bleibt hörbar.
            const { audioSession } = navigator as NavigatorWithAudioSession;
            if (audioSession) audioSession.type = "playback";

            contextRef.current = new AudioContext();
        }

        const context = contextRef.current;
        context.resume().catch(() => undefined);

        if (!bufferPromiseRef.current) {
            bufferPromiseRef.current = fetch(src)
                .then((response) => response.arrayBuffer())
                .then((data) => context.decodeAudioData(data))
                // Ohne ladbare Tonspur läuft das Video einfach stumm weiter
                .catch(() => null);
        }

        return bufferPromiseRef.current;
    }, [src]);

    // Startet den Loop an der vom Aufrufer gelieferten Position (Sekunden).
    // Die Position wird erst nach dem Laden gelesen, damit Audio und Video synchron bleiben.
    const start = useCallback(
        async (getOffset: () => number) => {
            stop();
            const request = requestRef.current;

            const buffer = await prepare();
            const context = contextRef.current;

            if (!buffer || !context || request !== requestRef.current) return;

            if (context.state === "suspended") {
                await context.resume().catch(() => undefined);
                if (request !== requestRef.current) return;
            }

            const voices = new Set<PlayingSource>();
            let nextStart = context.currentTime;
            let nextOffset = getOffset() % buffer.duration;
            let nextFadeIn = FADE_IN_SECONDS;

            // Plant einen Durchlauf ab dem Offset. Sein Ende blendet aus, während der nächste einblendet.
            const scheduleVoice = () => {
                const remaining = buffer.duration - nextOffset;
                const crossfade = Math.min(CROSSFADE_SECONDS, remaining);
                const startTime = nextStart;
                const endTime = startTime + remaining;
                const fadeOutStart = Math.max(
                    endTime - crossfade,
                    startTime + nextFadeIn,
                );

                const source = context.createBufferSource();
                source.buffer = buffer;

                const gain = context.createGain();
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(1, startTime + nextFadeIn);
                gain.gain.setValueAtTime(1, fadeOutStart);
                gain.gain.linearRampToValueAtTime(0, endTime);

                source.connect(gain);
                gain.connect(context.destination);
                source.start(startTime, nextOffset);
                source.stop(endTime);

                const voice = { source, gain };
                voices.add(voice);
                source.onended = () => {
                    source.disconnect();
                    gain.disconnect();
                    voices.delete(voice);
                };

                // Der nächste Durchlauf beginnt schon während der Überblendung
                nextStart = endTime - crossfade;
                nextOffset = 0;
                nextFadeIn = crossfade;
            };

            // Hält genug Durchläufe im Voraus eingeplant, ohne auf genaue Timer angewiesen zu sein
            const fillSchedule = () => {
                while (nextStart < context.currentTime + LOOKAHEAD_SECONDS)
                    scheduleVoice();
            };

            fillSchedule();
            const timer = setInterval(fillSchedule, SCHEDULER_INTERVAL_MS);

            playingRef.current = { voices, timer };
        },
        [prepare, stop],
    );

    const isPlaying = useCallback(() => playingRef.current !== null, []);

    useEffect(() => {
        return () => {
            stop();

            const context = contextRef.current;
            contextRef.current = null;

            // Das Schließen wartet das Ausblenden ab, sonst würde der Ton hart abgeschnitten
            setTimeout(
                () => context?.close().catch(() => undefined),
                FADE_OUT_SECONDS * 1000 + 50,
            );
        };
    }, [stop]);

    return { prepare, start, stop, isPlaying };
};
