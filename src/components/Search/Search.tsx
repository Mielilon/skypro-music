"use client";

import Icon from "../Icon/Icon";
import styles from "./Search.module.css";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setActiveFilters } from "../../store/features/playlistSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(
    (state) => state.playlist.activeFilters.searchQuery
  );

  return (
    <div className={cn(styles.centerblockSearch, styles.search)}>
      <Icon name="search" iconClass={styles.searchSvg} />
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) =>
          dispatch(setActiveFilters({ searchQuery: e.target.value }))
        }
        name="search"
      />
    </div>
  );
}
