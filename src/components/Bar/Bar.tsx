"use client";

import classNames from "classnames";
import Icon from "../Icon/Icon";
import styles from "./Bar.module.css";
import Volume from "@/components/Volume/Volume";
import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { useCurrentTrack } from "../../contexts/CurrentTrackProvider";
import { formatTrackTime } from "../../utils/formatTime";

export default function Bar() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { currentTrack } = useCurrentTrack();

  const duration = audioRef.current?.duration || 0;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleNotImplemented = () => {
    alert("Еще не реализовано");
  };

  if (!currentTrack) {
    return null;
  }

  const controls = [
    {
      name: "prev",
      handler: handleNotImplemented,
      wrapperClass: styles.playerBtnPrev,
      iconClass: styles.playerBtnPrevSvg,
    },
    {
      name: isPlaying ? "pause" : "play",
      handler: togglePlay,
      wrapperClass: styles.playerBtnPlay,
      iconClass: styles.playerBtnPlaySvg,
    },
    {
      name: "next",
      handler: handleNotImplemented,
      wrapperClass: styles.playerBtnNext,
      iconClass: styles.playerBtnNextSvg,
    },
    {
      name: "repeat",
      handler: handleNotImplemented,
      wrapperClass: styles.playerBtnRepeat,
      iconClass: styles.playerBtnRepeatSvg,
    },
    {
      name: "shuffle",
      handler: handleNotImplemented,
      wrapperClass: styles.playerBtnShuffle,
      iconClass: styles.playerBtnShuffleSvg,
    },
  ];

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
          <div className={classNames(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              {controls.map((control) => (
                <Icon
                  key={control.name}
                  name={control.name}
                  wrapperClass={control.wrapperClass}
                  iconClass={control.iconClass}
                  onClick={control.handler}
                />
              ))}
            </div>
            <div
              className={classNames(styles.playerTrackPlay, styles.trackPlay)}
            >
              <div className={styles.trackPlayContain}>
                <Icon
                  name="track"
                  wrapperClass={styles.trackPlayImage}
                  iconClass={styles.trackPlayImageSvg}
                />
                <div className={styles.trackPlayAuthor}>
                  {currentTrack.author && (
                    <span className={styles.trackPlayAuthorLink}>
                      {currentTrack.author}
                    </span>
                  )}
                </div>
                <div className={styles.trackPlayAlbum}>
                  {currentTrack.album && (
                    <span className={styles.trackPlayAlbumLink}>
                      {currentTrack.album}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div
                  className={classNames(styles.trackPlayLike, styles._btnIcon)}
                >
                  <Icon
                    name="like"
                    wrapperClass={classNames(
                      styles.trackPlayLike,
                      styles._btnIcon
                    )}
                    iconClass={styles.trackPlayLikeSvg}
                  />
                </div>
                <Icon
                  name="dislike"
                  wrapperClass={classNames(
                    styles.trackPlayDislike,
                    styles._btnIcon
                  )}
                  iconClass={styles.trackPlayDislikeSvg}
                />
              </div>
            </div>
          </div>
          <Volume audio={audioRef.current} />
        </div>
      </div>
    </div>
  );
}
