"use client";

import { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./FilterList.module.css";
import classNames from "classnames";
import { TrackListType } from "@/types/tracks";
import { getUniqueValues } from "@/utils/getUniqueValues";

const SORT_OPTIONS = ["По умолчанию", "Сначала новые", "Сначала старые"];

type FilterListProps = {
  tracks: TrackListType;
};

export default function FilterList({ tracks }: FilterListProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const filters = [
    {
      title: "Исполнителю",
      key: "author",
      list: getUniqueValues(tracks, "author"),
    },
    { title: "Году выпуска", key: "year", list: SORT_OPTIONS },
    { title: "Жанру", key: "genre", list: getUniqueValues(tracks, "genre") },
  ];

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          key={filter.key}
          title={filter.title}
          isActive={activeFilter === filter.key}
          handleFilter={() => handleFilter(filter.key)}
          list={filter.list}
        />
      ))}
    </div>
  );
}
