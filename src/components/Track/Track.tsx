"use client";

import { useCurrentTrack } from "../../contexts/CurrentTrackProvider";
import { TrackType } from "../../types/tracks";
import { formatTime } from "../../utils/formatTime";
import Icon from "../Icon/Icon";
import styles from "./Track.module.css";
import classNames from "classnames";

type TrackProps = {
  track: TrackType;
};

export default function Track({ track }: TrackProps) {
  const { name, author, album, duration_in_seconds } = track;

  const formatedTime = formatTime(duration_in_seconds);

  const { setCurrentTrack } = useCurrentTrack();

  const handleClick = () => {
    setCurrentTrack(track);
  };

  return (
    <div className={classNames(styles.playlistItem)} onClick={handleClick}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <Icon
            name="note"
            wrapperClass={styles.trackTitleImage}
            iconClass={styles.trackTitleSvg}
          />
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime}>
          <Icon name="like" iconClass={styles.trackTimeSvg} />
          <span className={styles.trackTimeText}>{formatedTime}</span>
        </div>
      </div>
    </div>
  );
}
