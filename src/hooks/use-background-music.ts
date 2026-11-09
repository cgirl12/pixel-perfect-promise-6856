import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.5;

/**
 * Background music that only starts from an explicit user action.
 * The audio element is created lazily, so nothing loads or plays before the visitor opts in.
 */
export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src]);

  const fadeIn = (audio: HTMLAudioElement) => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    audio.volume = 0;
    fadeRef.current = window.setInterval(() => {
      audio.volume = Math.min(TARGET_VOLUME, audio.volume + 0.04);
      if (audio.volume >= TARGET_VOLUME && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 80);
  };

  const play = useCallback(async () => {
    const audio = getAudio();
    setEnabled(true);
    try {
      await audio.play();
      fadeIn(audio);
    } catch {
      setPlaying(false);
    }
  }, [getAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) pause();
    else void play();
  }, [pause, play]);

  const toggleMute = useCallback(() => {
    const audio = getAudio();
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, [getAudio]);

  /** Show the controls without starting playback (e.g. returning visitor). */
  const enableControls = useCallback(() => setEnabled(true), []);

  useEffect(
    () => () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  return { enabled, playing, muted, play, pause, toggle, toggleMute, enableControls };
}
