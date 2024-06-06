import Icon from "../Icon/Icon";
import styles from "./Volume.module.css";
import classNames from "classnames";

export default function Volume() {
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
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}
