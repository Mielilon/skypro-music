"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  nextTrack,
  prevTrack,
  togglePlay,
  toggleShuffle,
} from "@/store/features/playlistSlice";
import { formatTrackTime } from "@/utils/formatTime";
import styles from "./Bar.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import PlayerControls from "./PlayerControls/PlayerControls";
import TrackInfo from "./TrackInfo/TrackInfo";
import Volume from "../Volume/Volume";

export default function Bar() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);

  const [currentTime, setCurrentTime] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const duration = audioRef.current?.duration || 0;

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      dispatch(togglePlay());
    }
  };

  const handleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrev = () => {
    dispatch(prevTrack());
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      setIsLoop((prev) => !prev);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const handleCanPlay = () => {
        audioRef.current?.play();
        dispatch(togglePlay(true));
      };

      audioRef.current.addEventListener("canplay", handleCanPlay);

      return () => {
        audioRef.current?.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    audioRef.current?.addEventListener("ended", handleNext);

    return () => {
      audioRef.current?.removeEventListener("ended", handleNext);
    };
  }, [currentTrack]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <span className={styles.barTime}>
          {formatTrackTime(currentTime, duration)}
        </span>
        <audio
          src={currentTrack.track_file}
          ref={audioRef}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <PlayerControls
            isPlaying={isPlaying}
            isLoop={isLoop}
            isShuffle={isShuffle}
            handlePrev={handlePrev}
            handlePlay={handlePlay}
            handleNext={handleNext}
            toggleLoop={toggleLoop}
            handleShuffle={handleShuffle}
          />
          <TrackInfo author={currentTrack.author} album={currentTrack.album} />
          <Volume audio={audioRef.current} />
        </div>
      </div>
    </div>
  );
}
