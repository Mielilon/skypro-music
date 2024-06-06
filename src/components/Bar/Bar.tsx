import classNames from "classnames";
import Icon from "../Icon/Icon";
import styles from "./Bar.module.css";
import Volume from "@/components/Volume/Volume";

export default function Bar() {
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress} />
        <div className={styles.barPlayerBlock}>
          <div className={`${styles.barPlayer} ${styles.player}`}>
            <div className={styles.playerControls}>
              <Icon
                name="prev"
                wrapperClass={styles.playerBtnPrev}
                iconClass={styles.playerBtnPrevSvg}
              />
              <Icon
                name="play"
                wrapperClass={styles.playerBtnPlay}
                iconClass={styles.playerBtnPlaySvg}
              />
              <Icon
                name="next"
                wrapperClass={styles.playerBtnNext}
                iconClass={styles.playerBtnNextSvg}
              />
              <Icon
                name="repeat"
                wrapperClass={styles.playerBtnRepeat}
                iconClass={styles.playerBtnRepeatSvg}
              />
              <Icon
                name="shuffle"
                wrapperClass={styles.playerBtnShuffle}
                iconClass={styles.playerBtnShuffleSvg}
              />
            </div>
            <div className={`${styles.playerTrackPlay} ${styles.trackPlay}`}>
              <div className={styles.trackPlayContain}>
                <Icon
                  name="track"
                  wrapperClass={styles.trackPlayImage}
                  iconClass={styles.trackPlayImageSvg}
                />
                <div className={styles.trackPlayAuthor}>
                  <span className={styles.trackPlayAuthorLink}>Ты та...</span>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <span className={styles.trackPlayAlbumLink}>Баста</span>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div className={`${styles.trackPlayLike} ${styles._btnIcon}`}>
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
          <Volume />
        </div>
      </div>
    </div>
  );
}
