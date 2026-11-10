import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.5;

export type Track = { id: string; src: string; title: string; artist?: string };

/** The song before/after `currentId` in the playlist, wrapping around at the ends. */
export function getAdjacentTrack(playlist: Track[], currentId: string, step: 1 | -1): Track {
  const idx = playlist.findIndex((t) => t.id === currentId);
  if (idx === -1) return step === 1 ? playlist[0] : playlist[playlist.length - 1];
  return playlist[(idx + step + playlist.length) % playlist.length];
}

/**
 * One shared audio player for the background music and the playlist.
 * Nothing loads or plays until the visitor explicitly asks for it.
 * Background music loops; playlist songs advance to the next song when they end.
 */
export function useMusic(background: Track, playlist: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const currentRef = useRef<Track>(background);
  const playTrackRef = useRef<(t: Track) => void>(() => {});

  const [current, setCurrent] = useState<Track>(background);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.volume = 0;
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("timeupdate", () => setTime(audio.currentTime));
      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration || 0));
      audio.addEventListener("ended", () => {
        const cur = currentRef.current;
        if (playlist.some((t) => t.id === cur.id)) {
          playTrackRef.current(getAdjacentTrack(playlist, cur.id, 1));
        }
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [playlist]);

  const load = useCallback(
    (audio: HTMLAudioElement, track: Track) => {
      audio.src = track.src;
      audio.loop = track.id === background.id;
      currentRef.current = track;
      setCurrent(track);
      setTime(0);
      setDuration(0);
    },
    [background.id],
  );

  const start = useCallback(async (audio: HTMLAudioElement) => {
    setEnabled(true);
    try {
      await audio.play();
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      audio.volume = 0;
      fadeRef.current = window.setInterval(() => {
        audio.volume = Math.min(TARGET_VOLUME, audio.volume + 0.05);
        if (audio.volume >= TARGET_VOLUME && fadeRef.current) {
          window.clearInterval(fadeRef.current);
          fadeRef.current = null;
        }
      }, 70);
    } catch {
      setPlaying(false);
    }
  }, []);

  const play = useCallback(async () => {
    const audio = getAudio();
    if (!audio.src) load(audio, currentRef.current);
    await start(audio);
  }, [getAudio, load, start]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) pause();
    else void play();
  }, [pause, play]);

  /** Play a specific track; clicking the one already playing pauses it. */
  const playTrack = useCallback(
    (track: Track) => {
      const audio = getAudio();
      if (currentRef.current.id === track.id && audio.src) {
        if (audio.paused) void start(audio);
        else audio.pause();
        return;
      }
      load(audio, track);
      void start(audio);
    },
    [getAudio, load, start],
  );
  playTrackRef.current = playTrack;

  const step = useCallback(
    (dir: 1 | -1) => {
      const audio = getAudio();
      load(audio, getAdjacentTrack(playlist, currentRef.current.id, dir));
      void start(audio);
    },
    [getAudio, load, playlist, start],
  );

  const seek = useCallback((t: number) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(t)) audio.currentTime = t;
  }, []);

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

  return {
    current,
    enabled,
    playing,
    muted,
    time,
    duration,
    play,
    pause,
    toggle,
    toggleMute,
    playTrack,
    next: () => step(1),
    prev: () => step(-1),
    seek,
    enableControls,
  };
}

export type MusicController = ReturnType<typeof useMusic>;
