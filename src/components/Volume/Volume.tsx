import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./Volume.module.css";
import classNames from "classnames";

type VolumeProps = {
  audio: HTMLAudioElement | null;
};

export default function Volume({ audio }: VolumeProps) {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <Icon
          name="volume"
          wrapperClass={styles.volumeImage}
          iconClass={styles.volumeSvg}
        />
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
            name="range"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
