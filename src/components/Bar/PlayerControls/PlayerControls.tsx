import Icon from "@/components/Icon/Icon";
import styles from "./PlayerControls.module.css";
import cn from "classnames";

type PlayerControlsProps = {
  isPlaying: boolean;
  isLoop: boolean;
  isShuffle: boolean;
  handlePrev: () => void;
  handlePlay: () => void;
  handleNext: () => void;
  toggleLoop: () => void;
  handleShuffle: () => void;
};

export default function PlayerControls({
  isPlaying,
  isLoop,
  isShuffle,
  handlePrev,
  handlePlay,
  handleNext,
  toggleLoop,
  handleShuffle,
}: PlayerControlsProps) {
  const controls = [
    {
      name: "prev",
      handler: handlePrev,
      wrapperClass: styles.playerBtnPrev,
      iconClass: styles.playerBtnPrevSvg,
    },
    {
      name: isPlaying ? "pause" : "play",
      handler: handlePlay,
      wrapperClass: styles.playerBtnPlay,
      iconClass: styles.playerBtnPlaySvg,
    },
    {
      name: "next",
      handler: handleNext,
      wrapperClass: styles.playerBtnNext,
      iconClass: styles.playerBtnNextSvg,
    },
    {
      name: "repeat",
      handler: toggleLoop,
      wrapperClass: styles.playerBtnRepeat,
      iconClass: cn(styles.playerBtnRepeatSvg, {
        [styles.active]: isLoop,
      }),
    },
    {
      name: "shuffle",
      handler: handleShuffle,
      wrapperClass: styles.playerBtnShuffle,
      iconClass: cn(styles.playerBtnShuffleSvg, {
        [styles.active]: isShuffle,
      }),
    },
  ];

  return (
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
  );
}
