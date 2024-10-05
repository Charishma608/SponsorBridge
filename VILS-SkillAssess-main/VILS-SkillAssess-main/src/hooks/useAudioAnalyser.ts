// useAudioIntensity.ts
import { useState, useEffect, useRef } from 'react';

export type UseAudioIntensityReturn = {
    intensity: number;
    startAnalyzing: () => void;
    stopAnalyzing: () => void;
};

const useAudioIntensity = (mediaRecorderRef: React.RefObject<MediaRecorder | null>): UseAudioIntensityReturn => {

    const [intensity, setIntensity] = useState<number>(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (mediaRecorderRef.current) {

            console.log(mediaRecorderRef.current);
            
            const stream = mediaRecorderRef.current.stream;
            // @ts-ignore
            audioContextRef.current = new (window.AudioContext || window?.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
        }

        return () => {
            stopAnalyzing();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [mediaRecorderRef]);

    const analyze = () => {
        if (!analyserRef || !analyserRef.current) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const averageIntensity = sum / dataArray.length;

        setIntensity(Math.round(averageIntensity));

        animationFrameRef.current = requestAnimationFrame(analyze);
    };

    const startAnalyzing = () => {
        if (!animationFrameRef.current) {
            analyze();
        }
    };

    const stopAnalyzing = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    return { intensity, startAnalyzing, stopAnalyzing };
};

export default useAudioIntensity;