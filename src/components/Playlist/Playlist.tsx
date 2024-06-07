import Track from "@/components/Track/Track";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import Icon from "../Icon/Icon";
import { TrackListType } from "../../types/tracks";

type PlaylistProps = {
  tracks: TrackListType;
  error: string | null;
};

export default function Playlist({ tracks, error }: PlaylistProps) {
  return (
    <div
      className={classNames(styles.centerblockContent, styles.playlistContent)}
    >
      <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <Icon
          name="watch"
          wrapperClass={classNames(styles.playlistTitleCol, styles.col04)}
          iconClass={styles.playlistTitleSvg}
        />
      </div>
      <div className={classNames(styles.contentPlaylist, styles.playlist)}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          tracks.map((track) => (
            <Track key={track.id} track={track} playlist={tracks} />
          ))
        )}
      </div>
    </div>
  );
}
