import classNames from "classnames";

import styles from "./FilterItem.module.css";

type FilterItemProps = {
  title: string;
  isActive: boolean;
  handleFilter: () => void;
  list: string[];
};

export default function FilterItem({
  title,
  isActive,
  handleFilter,
  list,
}: FilterItemProps) {
  return (
    <div className={styles.filterWrapper}>
      <div
        className={classNames(styles.filterButton, {
          [styles.filterButtonActive]: isActive,
        })}
        onClick={handleFilter}
      >
        {title}
      </div>
      {isActive && (
        <div className={styles.filterListWrapper}>
          <ul className={styles.filterList}>
            {list.map((item) => (
              <li key={item} className={styles.filterListItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
