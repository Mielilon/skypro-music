import Icon from "@/components/Icon/Icon";
import styles from "./TrackInfo.module.css";
import cn from "classnames";
import { useLikeTrack } from "../../../hooks/useLikeTrack";

type TrackInfoProps = {
  author: string;
  album: string;
  trackId: number;
};

export default function TrackInfo({ author, album, trackId }: TrackInfoProps) {
  const { isLiked, handleLike } = useLikeTrack(trackId);

  return (
    <div className={cn(styles.playerTrackPlay, styles.trackPlay)}>
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
        <div className={cn(styles.trackPlayLike, styles._btnIcon)}>
          <Icon
            name="like"
            onClick={handleLike}
            iconClass={cn(styles.trackPlayLikeSvg, {
              [styles.trackPlayLikeSvgActive]: isLiked,
            })}
            wrapperClass={cn(styles.trackPlayLike, styles._btnIcon)}
          />
        </div>
      </div>
    </div>
  );
}
