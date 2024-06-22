import Icon from "@/components/Icon/Icon";
import styles from "./TrackInfo.module.css";
import classNames from "classnames";
import { useLikeTrack } from "../../../hooks/useLikeTrack";

type TrackInfoProps = {
  author: string;
  album: string;
  trackId: number;
};

export default function TrackInfo({ author, album, trackId }: TrackInfoProps) {
  const { isLiked, handleLike } = useLikeTrack(trackId);

  return (
    <div className={classNames(styles.playerTrackPlay, styles.trackPlay)}>
      <div className={styles.trackPlayContain}>
        <Icon
          name="track"
          wrapperClass={styles.trackPlayImage}
          iconClass={styles.trackPlayImageSvg}
        />
        <div className={styles.trackPlayAuthor}>
          {author && (
            <span className={styles.trackPlayAuthorLink}>{author}</span>
          )}
        </div>
        <div className={styles.trackPlayAlbum}>
          {album && <span className={styles.trackPlayAlbumLink}>{album}</span>}
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div className={classNames(styles.trackPlayLike, styles._btnIcon)}>
          <Icon
            name="like"
            onClick={handleLike}
            iconClass={classNames(styles.trackPlayLikeSvg, {
              [styles.trackPlayLikeSvgActive]: isLiked,
            })}
            wrapperClass={classNames(styles.trackPlayLike, styles._btnIcon)}
          />
        </div>
      </div>
    </div>
  );
}
