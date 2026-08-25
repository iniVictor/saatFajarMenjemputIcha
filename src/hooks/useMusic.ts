import { useCallback, useEffect, useRef, useState } from "react";

interface UseMusicOptions {
  enabled: boolean;
  src: string;
  unlocked: boolean;
  loopStart: number;
  loopEnd: number;
}

function clampRange(start: number, end: number, duration: number) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const from = Math.max(0, start);
  const to = end > from ? end : safeDuration;
  if (safeDuration === 0) {
    return { from, to: to > from ? to : Number.POSITIVE_INFINITY };
  }
  return {
    from: Math.min(from, safeDuration),
    to: Math.min(to > from ? to : safeDuration, safeDuration),
  };
}

export function useMusic({
  enabled,
  src,
  unlocked,
  loopStart,
  loopEnd,
}: UseMusicOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rangeRef = useRef({ from: 0, to: Number.POSITIVE_INFINITY });
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled || !src) return;

    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = 0.42;
    audio.loop = false;
    audioRef.current = audio;

    const applyRange = () => {
      rangeRef.current = clampRange(loopStart, loopEnd, audio.duration);
    };

    const keepInLoop = () => {
      const { from, to } = rangeRef.current;
      if (!Number.isFinite(to)) return;
      if (audio.currentTime >= to - 0.05) {
        audio.currentTime = from;
      }
    };

    const restartLoop = () => {
      const { from } = rangeRef.current;
      audio.currentTime = from;
      void audio.play().catch(() => setPlaying(false));
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setFailed(true);

    audio.addEventListener("loadedmetadata", applyRange);
    audio.addEventListener("durationchange", applyRange);
    audio.addEventListener("timeupdate", keepInLoop);
    audio.addEventListener("ended", restartLoop);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    applyRange();

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", applyRange);
      audio.removeEventListener("durationchange", applyRange);
      audio.removeEventListener("timeupdate", keepInLoop);
      audio.removeEventListener("ended", restartLoop);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [enabled, loopEnd, loopStart, src]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    const { from, to } = rangeRef.current;
    if (audio.currentTime < from || audio.currentTime >= to) {
      audio.currentTime = from;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }, [failed]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else void play();
  }, [pause, play, playing]);

  useEffect(() => {
    if (unlocked && enabled) void play();
  }, [enabled, play, unlocked]);

  return {
    playing,
    failed,
    toggle,
    play,
    pause,
    visible: enabled && Boolean(src) && !failed,
  };
}
