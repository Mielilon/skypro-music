import Icon from "@/components/Icon/Icon";
import styles from "./TrackInfo.module.css";
import classNames from "classnames";

type TrackInfoProps = {
  author: string;
  album: string;
};

export default function TrackInfo({ author, album }: TrackInfoProps) {
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
            wrapperClass={classNames(styles.trackPlayLike, styles._btnIcon)}
            iconClass={styles.trackPlayLikeSvg}
          />
        </div>
        <Icon
          name="dislike"
          wrapperClass={classNames(styles.trackPlayDislike, styles._btnIcon)}
          iconClass={styles.trackPlayDislikeSvg}
        />
      </div>
    </div>
  );
}
