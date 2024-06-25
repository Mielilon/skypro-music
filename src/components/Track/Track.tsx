"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { TrackListType, TrackType } from "@/types/tracks";
import { formatTime } from "@/utils/formatTime";
import Icon from "@/components/Icon/Icon";
import styles from "./Track.module.css";
import cn from "classnames";
import { useLikeTrack } from "@/hooks/useLikeTrack";

type TrackProps = {
  track: TrackType;
  playlist: TrackListType;
};

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

  const isCurrentTrack = currentTrack?.id === track.id;
  const { isLiked, handleLike } = useLikeTrack(track.id);

  const { name, author, album, duration_in_seconds } = track;

  const formattedTime = formatTime(duration_in_seconds);

  const handleClick = () => {
    dispatch(
      setCurrentTrack({ currentTrack: track, currentPlaylist: playlist })
    );
  };

  return (
    <div className={cn(styles.playlistItem)} onClick={handleClick}>
      <div className={cn(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <Icon
            name="note"
            wrapperClass={cn(styles.trackTitleImage, {
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
        <div className={styles.trackTime} onClick={handleLike}>
          <Icon
            name="like"
            iconClass={cn(styles.trackTimeSvg, {
              [styles.trackTimeSvgActive]: isLiked,
            })}
          />
          <span className={styles.trackTimeText}>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
