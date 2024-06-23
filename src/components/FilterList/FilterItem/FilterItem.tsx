import cn from "classnames";
import styles from "./FilterItem.module.css";
import { useAppDispatch } from "@/hooks/store";
import { setActiveFilters } from "../../../store/features/playlistSlice";

type FilterItemProps = {
  title: string;
  isOpen: boolean;
  handleFilter: () => void;
  list: string[];
  active: string[] | string;
  handleActiveFilter: (item: string) => void;
};

export default function FilterItem({
  title,
  isOpen,
  handleFilter,
  list,
  active,
  handleActiveFilter,
}: FilterItemProps) {
  return (
    <div className={styles.filterWrapper}>
      <div
        className={cn(styles.filterButton, {
          [styles.filterButtonActive]: isOpen,
        })}
        onClick={handleFilter}
      >
        {title}
      </div>
      {isOpen && (
        <div className={styles.filterListWrapper}>
          <ul className={styles.filterList}>
            {list.map((item) => (
              <li
                key={item}
                onClick={() => handleActiveFilter(item)}
                className={cn(styles.filterListItem, {
                  [styles.filterListItemActive]:
                    typeof active === "string"
                      ? active === item
                      : active.includes(item),
                })}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
