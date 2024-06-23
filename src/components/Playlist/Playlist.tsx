"use client";

import Track from "@/components/Track/Track";
import styles from "./Playlist.module.css";
import cn from "classnames";
import Icon from "../Icon/Icon";
import { TrackListType } from "@/types/tracks";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { setCurrentPlaylist } from "../../store/features/playlistSlice";

type PlaylistProps = {
  tracks: TrackListType;
  error: string | null;
};

export default function Playlist({ tracks, error }: PlaylistProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPlaylist(tracks));
  }, [dispatch, tracks]);

  const filteredPlaylist = useAppSelector(
    (state) => state.playlist.filteredPlaylist
  );

  const activeFilters = useAppSelector((state) => state.playlist.activeFilters);

  const hasActiveFilters =
    activeFilters.genres.length > 0 ||
    activeFilters.authors.length > 0 ||
    activeFilters.searchQuery !== "";

  const tracksToDisplay =
    filteredPlaylist.length > 0 ? filteredPlaylist : tracks;

  return (
    <div className={cn(styles.centerblockContent, styles.playlistContent)}>
      <div className={cn(styles.contentTitle, styles.playlistTitle)}>
        <div className={cn(styles.playlistTitleCol, styles.col01)}>Трек</div>
        <div className={cn(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={cn(styles.playlistTitleCol, styles.col03)}>Альбом</div>
        <Icon
          name="watch"
          wrapperClass={cn(styles.playlistTitleCol, styles.col04)}
          iconClass={styles.playlistTitleSvg}
        />
      </div>
      <div className={cn(styles.contentPlaylist, styles.playlist)}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : hasActiveFilters && filteredPlaylist.length === 0 ? (
          <div className={styles.noTracks}>Треки не найдены</div>
        ) : (
          tracksToDisplay.map((track) => (
            <Track key={track.id} track={track} playlist={tracksToDisplay} />
          ))
        )}
      </div>
    </div>
  );
}
