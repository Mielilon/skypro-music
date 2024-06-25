"use client";

import { useState, useMemo } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./FilterList.module.css";
import cn from "classnames";
import { TrackListType } from "@/types/tracks";
import { getUniqueValues } from "@/utils/getUniqueValues";
import { SORT_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setActiveFilters } from "../../store/features/playlistSlice";

type FilterListProps = {
  tracks: TrackListType;
};

type ActiveFilters = {
  authors: string[];
  sortOption: string;
  genres: string[];
};

export default function FilterList({ tracks }: FilterListProps) {
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const activeFilters = useAppSelector(
    (state) => state.playlist.activeFilters as ActiveFilters
  );

  const handleFilter = (filter: string) => {
    setOpenFilter((prev) => (prev === filter ? null : filter));
  };

  const createHandleActiveFilter =
    (type: keyof ActiveFilters) => (item: string) => {
      const currentFilter = activeFilters[type];

      if (Array.isArray(currentFilter)) {
        const updatedFilter = currentFilter.includes(item)
          ? currentFilter.filter((i: string) => i !== item)
          : [...currentFilter, item];
        dispatch(setActiveFilters({ ...activeFilters, [type]: updatedFilter }));
      } else {
        dispatch(setActiveFilters({ ...activeFilters, [type]: item }));
      }
    };

  const filters = useMemo(
    () => [
      {
        title: "Исполнителю",
        type: "authors" as keyof ActiveFilters,
        list: getUniqueValues(tracks, "author"),
        active: activeFilters.authors,
        handleActiveFilter: createHandleActiveFilter("authors"),
      },
      {
        title: "Году выпуска",
        type: "sortOption" as keyof ActiveFilters,
        list: Object.values(SORT_OPTIONS),
        active: activeFilters.sortOption,
        handleActiveFilter: (item: string) => {
          dispatch(setActiveFilters({ ...activeFilters, sortOption: item }));
        },
      },
      {
        title: "Жанру",
        type: "genres" as keyof ActiveFilters,
        list: getUniqueValues(tracks, "genre"),
        active: activeFilters.genres,
        handleActiveFilter: createHandleActiveFilter("genres"),
      },
    ],
    [tracks, activeFilters, dispatch]
  );

  return (
    <div className={cn(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          key={filter.type}
          handleActiveFilter={filter.handleActiveFilter}
          title={filter.title}
          isOpen={openFilter === filter.type}
          handleFilter={() => handleFilter(filter.type)}
          list={filter.list}
          active={filter.active}
        />
      ))}
    </div>
  );
}
