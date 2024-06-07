"use client";

import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { setCurrentTrack } from "../../store/features/playlistSlice";
import { TrackListType, TrackType } from "../../types/tracks";
import { formatTime } from "../../utils/formatTime";
import Icon from "../Icon/Icon";
import styles from "./Track.module.css";
import classNames from "classnames";

type TrackProps = {
  track: TrackType;
  playlist: TrackListType;
};

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

  const isCurrentTrack = currentTrack?.id === track.id;

  const { name, author, album, duration_in_seconds } = track;

  const formatedTime = formatTime(duration_in_seconds);

  const handleClick = () => {
    dispatch(
      setCurrentTrack({ currentTrack: track, currentPlaylist: playlist })
    );
  };

  return (
    <div className={classNames(styles.playlistItem)} onClick={handleClick}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <Icon
            name="note"
            wrapperClass={classNames(styles.trackTitleImage, {
              [styles.trackTitleImageActive]: isCurrentTrack,
              [styles.trackTitleActiveAnimation]: isCurrentTrack && isPlaying,
            })}
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
